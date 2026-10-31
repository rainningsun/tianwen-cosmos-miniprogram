#!/usr/bin/env node
/**
 * 课程小程序静态校验。
 * 不引入任何依赖，直接在 Node 中运行。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const MP = path.join(ROOT, 'miniprogram');
const PACKAGE_LIMIT = 1.8 * 1024 * 1024;
const IMAGE_LIMIT = 120 * 1024;
const THUMB_LIMIT = 20 * 1024;
const COVER_LIMIT = 30 * 1024;

const errors = [];
const warnings = [];
const notes = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function readJson(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) {
    fail(`缺少文件：${relPath}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(abs, 'utf8'));
  } catch (error) {
    fail(`${relPath} 不是合法 JSON：${error.message}`);
    return null;
  }
}

function walk(dir, result = []) {
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'miniprogram_npm') continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(abs, result);
    } else if (entry.isFile()) {
      result.push(abs);
    }
  }
  return result;
}

function sizeOf(files) {
  return files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
}

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function checkStaticFiles() {
  const app = readJson('miniprogram/app.json');
  const project = readJson('project.config.json');
  readJson('miniprogram/sitemap.json');
  readJson('package.json');

  if (project && project.miniprogramRoot !== 'miniprogram/') {
    fail('project.config.json 的 miniprogramRoot 应为 miniprogram/');
  }
  if (project && project.appid !== 'touristappid') {
    warn(`当前 appid 为 ${project.appid}，确认没有提交上传私钥。`);
  }

  if (!app) return null;

  const pages = new Set(app.pages || []);
  for (const page of pages) {
    for (const ext of ['js', 'wxml']) {
      const file = path.join(MP, `${page}.${ext}`);
      if (!fs.existsSync(file)) fail(`app.json 页面缺少文件：${page}.${ext}`);
    }
  }

  for (const sub of app.subpackages || []) {
    if (!sub.root) {
      fail('app.json subpackages 中存在缺少 root 的条目');
      continue;
    }
    for (const page of sub.pages || []) {
      const route = `${sub.root}/${page}`.replace(/\/+/g, '/');
      for (const ext of ['js', 'wxml']) {
        const file = path.join(MP, `${route}.${ext}`);
        if (!fs.existsSync(file)) fail(`分包页面缺少文件：${route}.${ext}`);
      }
    }
  }

  return app;
}

function checkJavaScript() {
  const files = walk(MP)
    .concat(walk(path.join(ROOT, 'scripts')))
    .filter((file) => file.endsWith('.js'));
  for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
    if (result.status !== 0) {
      fail(`语法错误：${path.relative(ROOT, file)}\n${result.stderr.trim()}`);
    }
  }
  notes.push(`已检查 ${files.length} 个 JavaScript 文件`);
}

function checkTrackedPdfs() {
  try {
    const output = execFileSync('git', ['ls-files', '--', '*.pdf'], {
      cwd: ROOT,
      encoding: 'utf8'
    }).trim();
    if (output) fail(`仓库中存在被追踪的 PDF：\n${output}`);
  } catch (error) {
    warn('当前目录不是可用的 git 仓库，跳过 PDF 追踪检查');
  }
}

function resolveAsset(src) {
  if (typeof src !== 'string' || !src.startsWith('/')) return null;
  return path.join(MP, src.slice(1));
}

function checkLectureData(app) {
  const dataFile = path.join(MP, 'data', 'lectures.js');
  if (!fs.existsSync(dataFile)) {
    warnings.push('data/lectures.js 尚未建立，跳过讲次数据校验');
    return;
  }

  let data;
  try {
    delete require.cache[require.resolve(dataFile)];
    data = require(dataFile);
  } catch (error) {
    fail(`data/lectures.js 无法加载：${error.message}`);
    return;
  }

  const lectures = Array.isArray(data.lectures) ? data.lectures : [];
  if (!lectures.length) {
    warnings.push('data/lectures.js 尚无讲次，跳过讲次字段校验');
    return;
  }

  const ids = new Set();
  const routes = new Set();
  for (const sub of app.subpackages || []) {
    for (const page of sub.pages || []) {
      routes.add(`/${sub.root}/${page}`.replace(/\/+/g, '/'));
    }
  }

  const orders = lectures.map((lecture) => lecture.order).sort((a, b) => a - b);
  orders.forEach((order, index) => {
    if (order !== index + 1) fail(`讲次 order 不连续：期望 ${index + 1}，实际 ${order}`);
  });

  for (const lecture of lectures) {
    const label = lecture.id || `order-${lecture.order}`;
    if (!lecture.id) fail('存在缺少 id 的讲次');
    if (ids.has(lecture.id)) fail(`讲次 id 重复：${lecture.id}`);
    ids.add(lecture.id);

    if (lecture.status === 'published') {
      for (const field of ['title', 'date', 'pagePath', 'package', 'summary']) {
        if (!lecture[field]) fail(`${label} 缺少字段 ${field}`);
      }
      for (const field of ['questions', 'concepts', 'people', 'quotes']) {
        if (!Array.isArray(lecture[field]) || lecture[field].length === 0) {
          fail(`${label} 的 ${field} 不能为空`);
        }
      }
      if (!Array.isArray(lecture.images)) {
        fail(`${label} 的 images 必须是数组`);
      } else if (lecture.images.length === 0) {
        warn(`${label} 的背景图片尚未加入（内容增量阶段）`);
      }
      if (!routes.has(lecture.pagePath)) {
        fail(`${label} 的 pagePath 不在 app.json 分包中：${lecture.pagePath}`);
      }
      if (lecture.summary && lecture.summary.length < 120) {
        warn(`${label} 导读偏短（${lecture.summary.length} 字）`);
      }
      for (const image of lecture.images || []) {
        const abs = resolveAsset(image.src);
        if (!abs || !fs.existsSync(abs)) {
          fail(`${label} 缺少原页图片：${image.src}`);
        } else if (fs.statSync(abs).size > IMAGE_LIMIT) {
          fail(`${label} 原页图片超过 120KB：${image.src} (${formatSize(fs.statSync(abs).size)})`);
        }
        const thumb = resolveAsset(image.thumb);
        if (!thumb || !fs.existsSync(thumb)) {
          fail(`${label} 缺少缩略图：${image.thumb}`);
        } else if (fs.statSync(thumb).size > THUMB_LIMIT) {
          fail(`${label} 缩略图超过 20KB：${image.thumb} (${formatSize(fs.statSync(thumb).size)})`);
        }
        if (!image.caption || !image.page) warn(`${label} 的图片缺少图注或页码：${image.src}`);
      }
    } else if (lecture.status === 'upcoming') {
      const contentFields = ['summary', 'questions', 'concepts', 'people', 'quotes', 'images'];
      for (const field of contentFields) {
        const value = lecture[field];
        if (Array.isArray(value) ? value.length > 0 : Boolean(value)) {
          fail(`${label} 是 upcoming，但填入了 ${field} 内容`);
        }
      }
    } else {
      fail(`${label} 的 status 必须是 published 或 upcoming`);
    }
  }

  notes.push(`已校验 ${lectures.length} 讲（已上线 ${lectures.filter((l) => l.status === 'published').length} 讲）`);

  const coverDir = path.join(MP, 'assets', 'covers');
  for (const file of walk(coverDir)) {
    if (fs.statSync(file).size > COVER_LIMIT) {
      fail(`封面图超过 30KB：${path.relative(ROOT, file)}`);
    }
  }
}

function checkPackageSizes(app) {
  if (!app) return;
  const allFiles = walk(MP);
  const subRoots = (app.subpackages || []).map((sub) => sub.root.replace(/\/+$/, ''));
  const inSubpackage = (file) => {
    const rel = path.relative(MP, file).replace(/\\/g, '/');
    return subRoots.some((root) => rel === root || rel.startsWith(`${root}/`));
  };

  const mainFiles = allFiles.filter((file) => !inSubpackage(file));
  const mainSize = sizeOf(mainFiles);
  notes.push(`主包：${formatSize(mainSize)} / 1.8 MB`);
  if (mainSize > PACKAGE_LIMIT) fail(`主包超过 1.8MB：${formatSize(mainSize)}`);

  for (const root of subRoots) {
    const files = allFiles.filter((file) => {
      const rel = path.relative(MP, file).replace(/\\/g, '/');
      return rel === root || rel.startsWith(`${root}/`);
    });
    const size = sizeOf(files);
    notes.push(`${root}：${formatSize(size)} / 1.8 MB`);
    if (size > PACKAGE_LIMIT) fail(`${root} 超过 1.8MB：${formatSize(size)}`);
  }
}

function main() {
  const app = checkStaticFiles();
  checkJavaScript();
  checkTrackedPdfs();
  checkLectureData(app);
  checkPackageSizes(app);

  for (const note of notes) console.log(`· ${note}`);
  for (const warning of warnings) console.warn(`WARN ${warning}`);
  for (const error of errors) console.error(`FAIL ${error}`);

  if (errors.length) {
    console.error(`\n校验失败：${errors.length} 个错误`);
    process.exit(1);
  }
  console.log(`\n校验通过${warnings.length ? `（${warnings.length} 条提醒）` : ''}`);
}

main();
