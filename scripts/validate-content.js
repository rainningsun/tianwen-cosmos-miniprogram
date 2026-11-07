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
const PACKAGE_LIMIT = 1.5 * 1024 * 1024;
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
    warn(`当前 appid 为 ${project.appid}；确认没有把上传私钥或私密配置提交进仓库。`);
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

  const expectedTabs = ['pages/index/index', 'pages/topic/topic', 'pages/reference/reference', 'pages/explore/explore', 'pages/archive/archive'];
  const tabList = (app.tabBar && app.tabBar.list) || [];
  if (tabList.length !== 5 || expectedTabs.some((page) => !tabList.some((tab) => tab.pagePath === page))) {
    fail('tabBar 必须正好包含课程、主线、索引、探索、原页 5 个页面');
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
      for (const field of ['title', 'pagePath', 'package', 'summary', 'sourcePdf']) {
        if (!lecture[field]) fail(`${label} 缺少字段 ${field}`);
      }
      if (lecture.sourcePdf && !lecture.sourcePdf.toLowerCase().endsWith('.pdf')) {
        fail(`${label} 的 sourcePdf 不是 PDF 文件名：${lecture.sourcePdf}`);
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
    } else {
      fail(`${label} 的 status 必须是 published`);
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

function checkPublishedLectureCoverage() {
  const lectures = require(path.join(MP, 'data', 'lectures.js')).lectures
    .filter((lecture) => lecture.status === 'published');
  const glossary = require(path.join(MP, 'data', 'glossary.js')).glossary;
  const entities = require(path.join(MP, 'data', 'entities.js')).entities;
  const topics = require(path.join(MP, 'data', 'topics.js')).topics;
  const timeline = require(path.join(MP, 'data', 'timeline.js')).tracks;

  for (const lecture of lectures) {
    if (!glossary.some((term) => term.lectureIds.includes(lecture.id))) {
      fail(`已上线讲次 ${lecture.id} 没有概念词条覆盖`);
    }
    if (!entities.some((entity) => entity.lectureIds.includes(lecture.id))) {
      fail(`已上线讲次 ${lecture.id} 没有人物/装置条目覆盖`);
    }
    if (!topics.some((topic) => topic.lectureIds.includes(lecture.id))) {
      fail(`已上线讲次 ${lecture.id} 没有被任何思想专题覆盖`);
    }
    const timelineCount = timeline.reduce(
      (sum, track) => sum + track.events.filter((event) => (event.lectureIds || []).includes(lecture.id)).length,
      0
    );
    if (!timelineCount) warn(`已上线讲次 ${lecture.id} 尚未进入双时间线`);
  }

  notes.push(`已校验 ${lectures.length} 个已上线讲次的索引/专题覆盖`);
}

function checkGlossary() {
  const file = path.join(MP, 'data', 'glossary.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/glossary.js');
    return;
  }
  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/glossary.js 无法加载：${error.message}`);
    return;
  }

  const glossary = Array.isArray(data.glossary) ? data.glossary : [];
  if (glossary.length < 30 || glossary.length > 50) {
    fail(`概念词典应为 30-50 条，当前 ${glossary.length} 条`);
  }

  const categories = ['观测与方法', '天体与现象', '物理概念', '装置与技术', '思想与人文'];
  const lectureData = require(path.join(MP, 'data', 'lectures.js'));
  const topicData = require(path.join(MP, 'data', 'topics.js'));
  const lectureIds = new Set((lectureData.lectures || []).map((lecture) => lecture.id));
  const topicIds = new Set((topicData.topics || []).map((topic) => topic.id));
  const ids = new Set();

  for (const item of glossary) {
    const label = item.id || item.term || '(未命名词条)';
    if (!item.id || ids.has(item.id)) fail(`词条 id 缺失或重复：${label}`);
    ids.add(item.id);
    for (const field of ['term', 'en', 'category', 'definition']) {
      if (!item[field]) fail(`词条 ${label} 缺少字段 ${field}`);
    }
    if (!categories.includes(item.category)) fail(`词条 ${label} 分类非法：${item.category}`);
    if (!Array.isArray(item.lectureIds) || !item.lectureIds.length) fail(`词条 ${label} 缺少 lectureIds`);
    if (!Array.isArray(item.pages) || !item.pages.length || item.pages.some((page) => !Number.isInteger(page) || page < 1)) {
      fail(`词条 ${label} 的 pages 必须是正整数数组`);
    }
    if (!['course', 'supplement'].includes(item.sourceType)) fail(`词条 ${label} sourceType 非法`);
    for (const lectureId of item.lectureIds || []) {
      if (!lectureIds.has(lectureId)) fail(`词条 ${label} 引用了不存在的讲次：${lectureId}`);
    }
    for (const topicId of item.relatedTopicIds || []) {
      if (!topicIds.has(topicId)) fail(`词条 ${label} 引用了不存在的专题：${topicId}`);
    }
    for (const termId of item.relatedTermIds || []) {
      if (termId === item.id) fail(`词条 ${label} 不能关联自身`);
    }
  }

  for (const item of glossary) {
    for (const termId of item.relatedTermIds || []) {
      if (!ids.has(termId)) fail(`词条 ${item.id} 关联了不存在的词条：${termId}`);
    }
  }

  const entitiesFile = path.join(MP, 'data', 'entities.js');
  if (fs.existsSync(entitiesFile)) {
    const entityIds = new Set(require(entitiesFile).entities.map((entity) => entity.id));
    for (const item of glossary) {
      for (const entityId of item.relatedEntityIds || []) {
        if (!entityIds.has(entityId)) fail(`词条 ${item.id} 关联了不存在的人物/装置：${entityId}`);
      }
    }
  }

  for (const lecture of lectureData.lectures || []) {
    for (const concept of lecture.concepts || []) {
      if (!concept.termId) fail(`${lecture.id} 概念“${concept.term}”缺少 termId`);
      else if (!ids.has(concept.termId)) fail(`${lecture.id} 概念“${concept.term}”的 termId 不存在：${concept.termId}`);
    }
  }

  notes.push(`已校验 ${glossary.length} 个概念词条`);
}

function checkEntities() {
  const file = path.join(MP, 'data', 'entities.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/entities.js');
    return;
  }
  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/entities.js 无法加载：${error.message}`);
    return;
  }

  const entities = Array.isArray(data.entities) ? data.entities : [];
  const chains = Array.isArray(data.chains) ? data.chains : [];
  const people = entities.filter((entity) => entity.type === 'person');
  const devices = entities.filter((entity) => entity.type === 'device');
  if (people.length < 20) fail(`人物条目应至少 20 位，当前 ${people.length}`);
  if (devices.length < 5) fail(`装置条目应至少 5 个，当前 ${devices.length}`);
  if (chains.length < 6) fail(`思想链应至少 6 条，当前 ${chains.length}`);

  const ids = new Set();
  for (const entity of entities) {
    const label = entity.id || entity.name || '(未命名条目)';
    if (!entity.id || ids.has(entity.id)) fail(`人物/装置 id 缺失或重复：${label}`);
    ids.add(entity.id);
    if (!['person', 'device'].includes(entity.type)) fail(`${label} 的 type 非法`);
    for (const field of ['name', 'en', 'category', 'role', 'contribution', 'bio']) {
      if (!entity[field]) fail(`${label} 缺少字段 ${field}`);
    }
    if (!['course', 'supplement'].includes(entity.bioSource)) fail(`${label} bioSource 非法`);
    if (!Array.isArray(entity.lectureIds) || !entity.lectureIds.length) fail(`${label} 缺少 lectureIds`);
    if (!Array.isArray(entity.pages) || !entity.pages.length || entity.pages.some((page) => !Number.isInteger(page) || page < 1)) {
      fail(`${label} 的 pages 必须是正整数数组`);
    }
    if (!Array.isArray(entity.specs)) fail(`${label} 的 specs 必须是数组`);
    if (!['course', 'supplement'].includes(entity.sourceType)) fail(`${label} sourceType 非法`);
  }

  const glossary = require(path.join(MP, 'data', 'glossary.js')).glossary;
  const topics = require(path.join(MP, 'data', 'topics.js')).topics;
  const lectures = require(path.join(MP, 'data', 'lectures.js')).lectures;
  const termIds = new Set(glossary.map((item) => item.id));
  const topicIds = new Set(topics.map((topic) => topic.id));
  const lectureIds = new Set(lectures.map((lecture) => lecture.id));

  for (const entity of entities) {
    for (const lectureId of entity.lectureIds || []) {
      if (!lectureIds.has(lectureId)) fail(`条目 ${entity.id} 引用了不存在的讲次：${lectureId}`);
    }
    for (const entityId of entity.relatedEntityIds || []) {
      if (entityId === entity.id) fail(`条目 ${entity.id} 不能关联自身`);
      else if (!ids.has(entityId)) fail(`条目 ${entity.id} 关联了不存在的条目：${entityId}`);
    }
    for (const termId of entity.relatedTermIds || []) {
      if (!termIds.has(termId)) fail(`条目 ${entity.id} 关联了不存在的词条：${termId}`);
    }
    for (const topicId of entity.relatedTopicIds || []) {
      if (!topicIds.has(topicId)) fail(`条目 ${entity.id} 关联了不存在的专题：${topicId}`);
    }
  }

  for (const chain of chains) {
    if (!chain.id || !chain.title || !chain.description) fail('思想链字段不全');
    if (!Array.isArray(chain.entityIds) || chain.entityIds.length < 2) fail(`思想链 ${chain.id} 至少需要 2 个节点`);
    for (const entityId of chain.entityIds || []) {
      if (!ids.has(entityId)) fail(`思想链 ${chain.id} 引用了不存在的条目：${entityId}`);
    }
    for (const lectureId of chain.lectureIds || []) {
      if (!lectureIds.has(lectureId)) fail(`思想链 ${chain.id} 引用了不存在的讲次：${lectureId}`);
    }
    if (!Array.isArray(chain.pages) || !chain.pages.length) fail(`思想链 ${chain.id} 缺少页码`);
  }

  for (const lecture of lectures) {
    for (const person of lecture.people || []) {
      if (!person.entityId) fail(`${lecture.id} 人物“${person.name}”缺少 entityId`);
      else if (!ids.has(person.entityId)) fail(`${lecture.id} 人物“${person.name}”的 entityId 不存在：${person.entityId}`);
    }
  }

  notes.push(`已校验 ${people.length} 位人物、${devices.length} 个装置、${chains.length} 条思想链`);
}

function checkScale() {
  const file = path.join(MP, 'data', 'scale.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/scale.js');
    return;
  }
  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/scale.js 无法加载：${error.message}`);
    return;
  }

  const stages = Array.isArray(data.stages) ? data.stages : [];
  if (stages.length < 7 || stages.length > 9) fail(`宇宙尺度应为 7-9 层，当前 ${stages.length}`);
  const ids = new Set();
  const lectures = require(path.join(MP, 'data', 'lectures.js')).lectures;
  const lectureIds = new Set(lectures.map((lecture) => lecture.id));
  const terms = require(path.join(MP, 'data', 'glossary.js')).glossary;
  const termIds = new Set(terms.map((term) => term.id));
  let previous = -1;

  stages.forEach((stage, index) => {
    const label = stage.id || `order-${stage.order}`;
    if (!stage.id || ids.has(stage.id)) fail(`尺度层级 id 缺失或重复：${label}`);
    ids.add(stage.id);
    if (stage.order !== index + 1) fail(`尺度层级 order 不连续：${stage.id}`);
    if (!stage.title || !stage.distanceLabel || !stage.method || !stage.description) fail(`尺度层级 ${label} 字段不全`);
    if (!Number.isFinite(stage.distanceMeters) || stage.distanceMeters < 0) fail(`尺度层级 ${label} distanceMeters 非法`);
    if (stage.distanceMeters <= previous) fail(`尺度层级 ${label} distanceMeters 未递增`);
    previous = stage.distanceMeters;
    if (!['course', 'supplement'].includes(stage.sourceType)) fail(`尺度层级 ${label} sourceType 非法`);
    if (!Array.isArray(stage.pages) || !stage.pages.length || stage.pages.some((page) => !Number.isInteger(page) || page < 1)) {
      fail(`尺度层级 ${label} 的 pages 非法`);
    }
    for (const lectureId of stage.lectureIds || []) {
      if (!lectureIds.has(lectureId)) fail(`尺度层级 ${label} 引用了不存在的讲次：${lectureId}`);
    }
    for (const termId of stage.relatedTermIds || []) {
      if (!termIds.has(termId)) fail(`尺度层级 ${label} 引用了不存在的词条：${termId}`);
    }
  });

  notes.push(`已校验 ${stages.length} 个宇宙尺度层级`);
}

function checkTimeline() {
  const file = path.join(MP, 'data', 'timeline.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/timeline.js');
    return;
  }
  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/timeline.js 无法加载：${error.message}`);
    return;
  }

  const tracks = Array.isArray(data.tracks) ? data.tracks : [];
  const cosmic = tracks.find((track) => track.id === 'cosmic');
  const human = tracks.find((track) => track.id === 'human');
  if (!cosmic || !human || tracks.length !== 2) fail('双时间线必须正好包含 cosmic 与 human 两条轨道');
  if (cosmic && cosmic.events.length < 6) fail(`宇宙时间线至少 6 个节点，当前 ${cosmic.events.length}`);
  if (human && human.events.length < 10) fail(`人类观测史至少 10 个节点，当前 ${human.events.length}`);

  const lectures = require(path.join(MP, 'data', 'lectures.js')).lectures;
  const lectureIds = new Set(lectures.map((lecture) => lecture.id));
  const entityIds = new Set(require(path.join(MP, 'data', 'entities.js')).entities.map((entity) => entity.id));
  const termIds = new Set(require(path.join(MP, 'data', 'glossary.js')).glossary.map((term) => term.id));
  const eventIds = new Set();

  for (const track of tracks) {
    if (!track.title || !track.subtitle) fail(`时间线 ${track.id} 缺少标题或副标题`);
    for (const event of track.events || []) {
      const label = event.id || event.title || '(未命名事件)';
      if (!event.id || eventIds.has(event.id)) fail(`时间线事件 id 缺失或重复：${label}`);
      eventIds.add(event.id);
      for (const field of ['timeLabel', 'title', 'description']) {
        if (!event[field]) fail(`时间线事件 ${label} 缺少字段 ${field}`);
      }
      if (!['course', 'supplement'].includes(event.sourceType)) fail(`时间线事件 ${label} sourceType 非法`);
      if (!Array.isArray(event.pages) || !event.pages.length || event.pages.some((page) => !Number.isInteger(page) || page < 1)) {
        fail(`时间线事件 ${label} pages 非法`);
      }
      for (const lectureId of event.lectureIds || []) {
        if (!lectureIds.has(lectureId)) fail(`时间线事件 ${label} 引用了不存在的讲次：${lectureId}`);
      }
      for (const entityId of event.relatedEntityIds || []) {
        if (!entityIds.has(entityId)) fail(`时间线事件 ${label} 引用了不存在的条目：${entityId}`);
      }
      for (const termId of event.relatedTermIds || []) {
        if (!termIds.has(termId)) fail(`时间线事件 ${label} 引用了不存在的词条：${termId}`);
      }
    }
  }

  notes.push(`已校验双时间线：${cosmic ? cosmic.events.length : 0} 个宇宙节点、${human ? human.events.length : 0} 个观测史节点`);
}

function checkQuestions() {
  const file = path.join(MP, 'data', 'questions.js');
  if (!fs.existsSync(file)) {
    fail('缺少 data/questions.js');
    return;
  }
  let data;
  try {
    delete require.cache[require.resolve(file)];
    data = require(file);
  } catch (error) {
    fail(`data/questions.js 无法加载：${error.message}`);
    return;
  }

  const questions = Array.isArray(data.questions) ? data.questions : [];
  if (questions.length !== 6) {
    fail(`未解之谜必须正好 6 条，当前 ${questions.length} 条`);
  }

  const lectures = require(path.join(MP, 'data', 'lectures.js')).lectures;
  const lectureIds = new Set(lectures.map((lecture) => lecture.id));
  const entities = require(path.join(MP, 'data', 'entities.js')).entities;
  const entityIds = new Set(entities.map((entity) => entity.id));
  const terms = require(path.join(MP, 'data', 'glossary.js')).glossary;
  const termIds = new Set(terms.map((term) => term.id));
  const topics = require(path.join(MP, 'data', 'topics.js')).topics;
  const topicIds = new Set(topics.map((topic) => topic.id));
  const ids = new Set();
  const themes = new Set();

  for (const item of questions) {
    const label = item.id || item.question || '(未命名问题)';
    if (!item.id || ids.has(item.id)) fail(`未解之谜 id 缺失或重复：${label}`);
    ids.add(item.id);
    for (const field of ['question', 'kicker', 'theme', 'known', 'unknown', 'why']) {
      if (!item[field]) fail(`未解之谜 ${label} 缺少字段 ${field}`);
    }
    themes.add(item.theme);
    if (!Array.isArray(item.lectureIds) || !item.lectureIds.length) fail(`未解之谜 ${label} 缺少 lectureIds`);
    if (!Array.isArray(item.pages) || !item.pages.length || item.pages.some((page) => !Number.isInteger(page) || page < 1)) {
      fail(`未解之谜 ${label} 的 pages 必须是正整数数组`);
    }
    if (!['course', 'supplement'].includes(item.sourceType)) fail(`未解之谜 ${label} sourceType 非法`);
    for (const lectureId of item.lectureIds || []) {
      if (!lectureIds.has(lectureId)) fail(`未解之谜 ${label} 引用了不存在的讲次：${lectureId}`);
    }
    for (const entityId of item.relatedEntityIds || []) {
      if (!entityIds.has(entityId)) fail(`未解之谜 ${label} 引用了不存在的条目：${entityId}`);
    }
    for (const termId of item.relatedTermIds || []) {
      if (!termIds.has(termId)) fail(`未解之谜 ${label} 引用了不存在的词条：${termId}`);
    }
    for (const topicId of item.relatedTopicIds || []) {
      if (!topicIds.has(topicId)) fail(`未解之谜 ${label} 引用了不存在的专题：${topicId}`);
    }
  }

  if (themes.size !== 5) fail(`未解之谜应有 5 个主题，当前 ${themes.size}`);

  for (const term of terms) {
    for (const questionId of term.relatedQuestionIds || []) {
      if (!ids.has(questionId)) fail(`词条 ${term.id} 关联了不存在的问题：${questionId}`);
    }
  }
  for (const entity of entities) {
    for (const questionId of entity.relatedQuestionIds || []) {
      if (!ids.has(questionId)) fail(`条目 ${entity.id} 关联了不存在的问题：${questionId}`);
    }
  }

  notes.push(`已校验 ${questions.length} 个未解之谜（${themes.size} 个主题）`);
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
  const glossaryIds = new Set(require(path.join(MP, 'data', 'glossary.js')).glossary.map((term) => term.id));
  const entityIds = new Set(require(path.join(MP, 'data', 'entities.js')).entities.map((entity) => entity.id));
  const questionIds = new Set(require(path.join(MP, 'data', 'questions.js')).questions.map((question) => question.id));
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
    for (const termId of topic.relatedGlossaryIds || []) {
      if (!glossaryIds.has(termId)) fail(`专题 ${label} 关联了不存在的词条：${termId}`);
    }
    for (const entityId of topic.relatedEntityIds || []) {
      if (!entityIds.has(entityId)) fail(`专题 ${label} 关联了不存在的条目：${entityId}`);
    }
    for (const link of topic.relatedExplore || []) {
      if (!['scale', 'timeline', 'question'].includes(link.kind)) {
        fail(`专题 ${label} 的探索链接类型非法：${link.kind}`);
      }
      if (!link.title) fail(`专题 ${label} 的探索链接缺少标题`);
      if (link.kind === 'question' && !questionIds.has(link.target)) {
        fail(`专题 ${label} 关联了不存在的问题：${link.target}`);
      }
      if (link.kind === 'timeline' && !['cosmic', 'human', 'compare'].includes(link.mode)) {
        fail(`专题 ${label} 的时间线模式非法：${link.mode}`);
      }
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

function checkLegacyModuleRemoved() {
  const roots = ['pages', 'data', 'templates', 'utils', 'components'].map((dir) => path.join(MP, dir));
  const files = roots
    .flatMap((dir) => walk(dir))
    .filter((file) => /\.(js|json|wxml|wxss)$/.test(file));
  const latin = ['assign', 'ment'].join('');
  const han = ['作', '业'].join('');
  const pattern = new RegExp(`${latin}|${han}|openAssign${'ment'}|data\\/${latin}`, 'i');
  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    if (pattern.test(source)) {
      fail(`v2 已移除的旧模块仍存在引用：${path.relative(ROOT, file)}`);
    }
  }
}

function checkLectureTemplateBindings(app) {
  if (!app) return;
  for (const sub of app.subpackages || []) {
    const wxml = path.join(MP, sub.root, 'pages', 'lecture', 'lecture.wxml');
    if (!fs.existsSync(wxml)) continue;
    const source = fs.readFileSync(wxml, 'utf8');
    if (!source.includes('exploreLinks: exploreLinks')) {
      fail(`讲次模板没有把 exploreLinks 传入：${path.relative(ROOT, wxml)}`);
    }
  }
}

function checkNoHardcodedFive() {
  const roots = ['pages', 'components', 'templates', 'utils'].map((dir) => path.join(MP, dir));
  const files = roots
    .flatMap((dir) => walk(dir))
    .filter((file) => file.endsWith('.js') || file.endsWith('.wxml'));
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
  notes.push(`主包：${formatSize(mainSize)} / 1.5 MB`);
  if (mainSize > PACKAGE_LIMIT) fail(`主包超过 1.5MB：${formatSize(mainSize)}`);

  for (const root of subRoots) {
    const files = allFiles.filter((file) => {
      const rel = path.relative(MP, file).replace(/\\/g, '/');
      return rel === root || rel.startsWith(`${root}/`);
    });
    const size = sizeOf(files);
    notes.push(`${root}：${formatSize(size)} / 1.5 MB`);
    if (size > PACKAGE_LIMIT) fail(`${root} 超过 1.5MB：${formatSize(size)}`);
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
  checkPublishedLectureCoverage();
  checkGlossary();
  checkEntities();
  checkScale();
  checkTimeline();
  checkQuestions();
  checkTopics();
  checkLegacyModuleRemoved();
  checkLectureTemplateBindings(app);
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
