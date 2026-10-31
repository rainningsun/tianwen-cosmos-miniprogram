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
    warn(`当前 appid 为 ${project.appid}（测试号或正式号），确认没有提交上传私钥。`);
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

  const expectedTabs = ['pages/index/index', 'pages/topic/topic', 'pages/archive/archive', 'pages/assignment/assignment'];
  const tabList = (app.tabBar && app.tabBar.list) || [];
  if (tabList.length !== 4 || expectedTabs.some((page) => !tabList.some((tab) => tab.pagePath === page))) {
    fail('tabBar 必须包含课程、主线、原页、作业 4 个页面');
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

function checkJsonAndComponents() {
  const jsonFiles = walk(MP).filter((file) => file.endsWith('.json'));
  for (const file of jsonFiles) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (error) {
      fail(`${path.relative(ROOT, file)} 不是合法 JSON：${error.message}`);
      continue;
    }
    for (const ref of Object.values(data.usingComponents || {})) {
      if (typeof ref !== 'string' || !ref.startsWith('/')) {
        fail(`${path.relative(ROOT, file)} 的组件路径必须是绝对路径：${ref}`);
        continue;
      }
      const base = path.join(MP, ref.slice(1));
      for (const ext of ['js', 'json', 'wxml']) {
        if (!fs.existsSync(`${base}.${ext}`)) {
          fail(`${path.relative(ROOT, file)} 引用的组件缺少 ${ref}.${ext}`);
        }
      }
    }
  }
  notes.push(`已检查 ${jsonFiles.length} 个 JSON 与组件引用`);
}

function checkTrackedForbidden() {
  try {
    const output = execFileSync('git', ['ls-files', '--', '*.pdf', 'project.private.config.json', '*.key'], {
      cwd: ROOT,
      encoding: 'utf8'
    }).trim();
    if (output) fail(`仓库中存在不应追踪的文件：\n${output}`);
  } catch (error) {
    warn('当前目录不是可用的 git 仓库，跳过敏感文件追踪检查');
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
      for (const field of ['questions', 'concepts', 'people', 'quotes', 'images']) {
        if (!Array.isArray(lecture[field]) || lecture[field].length === 0) {
          fail(`${label} 的 ${field} 不能为空`);
        }
      }

      const summaryLength = Array.from(lecture.summary || '').length;
      if (summaryLength < 150 || summaryLength > 250) {
        fail(`${label} 导读应为 150-250 字，当前 ${summaryLength} 字`);
      }

      const ranges = {
        questions: [2, 4],
        concepts: [5, 8],
        people: [3, 6],
        quotes: [1, 3],
        images: [6, 10]
      };
      for (const [field, [min, max]] of Object.entries(ranges)) {
        const count = (lecture[field] || []).length;
        if (count < min || count > max) {
          fail(`${label} 的 ${field} 应为 ${min}-${max} 项，当前 ${count} 项`);
        }
      }

      if (!routes.has(lecture.pagePath)) {
        fail(`${label} 的 pagePath 不在 app.json 分包中：${lecture.pagePath}`);
      }
      if (lecture.cover) {
        const cover = resolveAsset(lecture.cover);
        if (!cover || !fs.existsSync(cover)) {
          fail(`${label} 缺少封面图：${lecture.cover}`);
        } else if (fs.statSync(cover).size > COVER_LIMIT) {
          fail(`${label} 封面图超过 30KB：${lecture.cover}`);
        }
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
        if (!image.caption) fail(`${label} 的图片缺少图注：${image.src}`);
        if (!Number.isInteger(image.page) || image.page < 1) {
          fail(`${label} 的图片页码无效：${image.src}`);
        }
      }

      for (const concept of lecture.concepts || []) {
        if (!concept.term || !concept.desc || !Number.isInteger(concept.page)) {
          fail(`${label} 存在字段不全的概念卡：${concept.term || '(未命名)'}`);
        }
      }
      for (const person of lecture.people || []) {
        if (!person.name || !person.note || !Number.isInteger(person.page)) {
          fail(`${label} 存在字段不全的人物/装置条目：${person.name || '(未命名)'}`);
        }
      }
      for (const quote of lecture.quotes || []) {
        if (!quote.text || !quote.author || !Number.isInteger(quote.page)) {
          fail(`${label} 存在字段不全的金句：${quote.text || '(空)'}`);
        }
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

function checkTopics() {
  const file = path.join(MP, 'data', 'topics.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/topics.js');
    return;
  }

  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/topics.js 无法加载：${error.message}`);
    return;
  }

  const topics = Array.isArray(data.topics) ? data.topics : [];
  if (topics.length < 6) fail(`思想主线应至少 6 个专题，当前 ${topics.length} 个`);

  let lectureData;
  try {
    lectureData = require(path.join(MP, 'data', 'lectures.js'));
  } catch (error) {
    lectureData = { lectures: [] };
  }
  const lectureById = new Map((lectureData.lectures || []).map((lecture) => [lecture.id, lecture]));
  const ids = new Set();

  for (const topic of topics) {
    const label = topic.id || topic.title || '(未命名专题)';
    if (!topic.id || ids.has(topic.id)) fail(`专题 id 缺失或重复：${label}`);
    ids.add(topic.id);
    for (const field of ['title', 'en', 'lede', 'thesis', 'source', 'layout']) {
      if (!topic[field]) fail(`专题 ${label} 缺少字段 ${field}`);
    }
    if (!Array.isArray(topic.sections) || topic.sections.length < 3) {
      fail(`专题 ${label} 至少需要 3 段导读`);
    }
    if (!Array.isArray(topic.lectureIds) || topic.lectureIds.length === 0) {
      fail(`专题 ${label} 没有关联讲次`);
    } else {
      for (const lectureId of topic.lectureIds) {
        const lecture = lectureById.get(lectureId);
        if (!lecture || lecture.status !== 'published') {
          fail(`专题 ${label} 关联了未上线讲次：${lectureId}`);
        }
      }
    }
    if (topic.layout === 'nodes' && (!Array.isArray(topic.nodes) || topic.nodes.length !== 3)) {
      fail(`专题 ${label} 的三段论应有 3 个节点`);
    }
    if (topic.layout === 'ladder' && (!Array.isArray(topic.steps) || topic.steps.length !== 5)) {
      fail(`专题 ${label} 的距离阶梯应有 5 级`);
    }
    if (topic.layout === 'timeline' && (!Array.isArray(topic.steps) || topic.steps.length < 3)) {
      fail(`专题 ${label} 的时间线至少 3 个节点`);
    }
    if (topic.quote && (!topic.quote.text || !topic.quote.author || !Number.isInteger(topic.quote.page))) {
      fail(`专题 ${label} 的金句字段不全`);
    }
  }

  notes.push(`已校验 ${topics.length} 个思想专题`);
}

function checkAssignment() {
  const file = path.join(MP, 'data', 'assignment.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/assignment.js');
    return;
  }

  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/assignment.js 无法加载：${error.message}`);
    return;
  }

  const assignment = data.assignment || {};
  if (!Array.isArray(assignment.forms) || assignment.forms.length !== 4) {
    fail('作业页应有 4 种表现形式');
  }
  if (!Array.isArray(assignment.categories) || assignment.categories.length !== 4) {
    fail('作业页应有 4 类参考选题');
  }
  if (!assignment.theme || !assignment.theme.includes('我眼中的宇宙之美')) {
    fail('作业主题缺少“我眼中的宇宙之美”');
  }
  if (!assignment.footnote || !assignment.footnote.includes('选题不限于以上内容')) {
    fail('作业页缺少“选题不限于以上内容”的说明');
  }

  const itemIds = new Set();
  let itemCount = 0;
  for (const category of assignment.categories || []) {
    for (const item of category.items || []) {
      itemCount += 1;
      if (!item.id || itemIds.has(item.id)) fail(`作业选题 id 缺失或重复：${item.id || category.title}`);
      itemIds.add(item.id);
      if (!item.text) fail(`作业选题缺少文字：${category.title}`);
    }
  }
  if (itemCount < 10) fail(`作业参考选题过少：${itemCount} 项`);

  notes.push(`已校验作业：${assignment.forms.length} 种形式、${assignment.categories.length} 类选题、${itemCount} 条灵感`);
}

function checkNoHardcodedFive() {
  const files = walk(MP).filter((file) => file.endsWith('.js') || file.endsWith('.wxml'));
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    if (source.includes('五讲') || /slice\s*\(\s*0\s*,\s*5\s*\)/.test(source) || /length\s*===\s*5/.test(source)) {
      fail(`页面逻辑疑似写死“五讲”：${path.relative(ROOT, file)}`);
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

  const total = sizeOf(allFiles);
  notes.push(`总包：${formatSize(total)} / 20 MB`);
  if (total > 20 * 1024 * 1024) fail(`总包超过 20MB：${formatSize(total)}`);
}

function main() {
  const app = checkStaticFiles();
  checkJavaScript();
  checkJsonAndComponents();
  checkTrackedForbidden();
  checkLectureData(app);
  checkTopics();
  checkAssignment();
  checkNoHardcodedFive();
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
