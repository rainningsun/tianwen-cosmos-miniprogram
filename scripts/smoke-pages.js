#!/usr/bin/env node
/**
 * 页面逻辑冒烟测试：用最小 wx / Page 桩验证取数、导航与本地勾选。
 * 不替代微信开发者工具编译，只防止数据与页面逻辑回归。
 */
const assert = require('assert');
const path = require('path');

const storage = {};
const capturedPages = [];

global.Page = (config) => {
  capturedPages.push(config);
  return config;
};
global.Component = (config) => config;
global.App = (config) => config;
global.getApp = () => ({ globalData: { starfieldEnabled: true } });
global.wx = {
  getStorageSync: (key) => storage[key],
  setStorageSync: (key, value) => { storage[key] = value; },
  removeStorageSync: (key) => { delete storage[key]; },
  setNavigationBarTitle: () => {},
  navigateTo: () => {},
  redirectTo: () => {},
  switchTab: () => {},
  pageScrollTo: () => {},
  previewImage: () => {},
  showToast: () => {},
  showModal: () => {},
  createSelectorQuery: () => ({
    select: () => ({ boundingClientRect: () => ({}) }),
    selectViewport: () => ({ scrollOffset: () => ({}) }),
    exec: () => {}
  })
};

function loadPage(relativePath) {
  const absolute = path.resolve(__dirname, '..', relativePath);
  delete require.cache[require.resolve(absolute)];
  require(absolute);
  return capturedPages[capturedPages.length - 1];
}

function instantiate(config) {
  const instance = Object.assign({}, config);
  instance.data = JSON.parse(JSON.stringify(config.data || {}));
  instance.setData = function setData(patch, callback) {
    Object.assign(this.data, patch);
    if (typeof callback === 'function') callback();
  };
  return instance;
}

function testIndex() {
  const page = instantiate(loadPage('miniprogram/pages/index/index.js'));
  page.onLoad();
  page.onShow();
  assert.strictEqual(page.data.publishedCount, 7, '已上线讲次应为 7');
  assert.strictEqual(page.data.lectures.length, 7, '首页时间轴应有 7 讲');
  assert.strictEqual(page.data.upcoming, undefined, '课程已完结，不应再有待更新占位');
  assert.strictEqual(typeof page.openReference, 'function', '首页应有索引入口');
  assert.strictEqual(typeof page.openExplore, 'function', '首页应有探索入口');
}

function testTopic() {
  const page = instantiate(loadPage('miniprogram/pages/topic/topic.js'));
  page.onLoad({});
  page.onShow();
  assert.strictEqual(page.data.topics.length, 6, '应有 6 个思想专题');
  page.selectTopic({ currentTarget: { dataset: { id: 'are-we-alone' } } });
  assert.strictEqual(page.data.topic.id, 'are-we-alone', '专题切换失败');
  assert.ok(page.data.related.length > 0, '专题应有相关讲次');
  assert.strictEqual(page.data.relatedTerms.length, 3, 'Are we alone 应有 3 个相关词条');
  assert.strictEqual(page.data.relatedEntities.length, 3, 'Are we alone 应有 3 个相关人物');
  assert.strictEqual(page.data.exploreLinks.length, 2, 'Are we alone 应有 2 个探索链接');
}

function testArchive() {
  const page = instantiate(loadPage('miniprogram/pages/archive/archive.js'));
  page.onShow();
  assert.strictEqual(page.data.lectures.length, 7, '原页索引应包含 7 讲');
  assert.strictEqual(page.data.lectures[6].title, '快速射电暴与动态宇宙', '第七讲应已上线');
  assert.strictEqual(page.data.lectures[6].count, 10, '第七讲应有 10 张原页');
}

function testReferenceAndGlossary() {
  const reference = instantiate(loadPage('miniprogram/pages/reference/reference.js'));
  assert.strictEqual(reference.data.glossaryCount, 50, '概念词典应有 50 条');
  assert.strictEqual(reference.data.peopleCount, 39, '人物索引应有 39 位');
  assert.strictEqual(reference.data.deviceCount, 6, '装置索引应有 6 个');
  assert.strictEqual(reference.data.chainCount, 8, '思想链应有 8 条');
  reference.onSearch({ detail: { value: '秒差距' } });
  assert.strictEqual(reference.data.results.length, 1, '索引搜索“秒差距”应返回 1 条');
  reference.onSearch({ detail: { value: '萨根' } });
  assert.ok(reference.data.results.some((item) => item.kind === 'entity'), '索引搜索“萨根”应返回人物条目');

  const glossary = instantiate(loadPage('miniprogram/pages/glossary/glossary.js'));
  glossary.onLoad();
  assert.strictEqual(glossary.data.resultCount, 50, '词典列表应显示 50 条');
  assert.strictEqual(glossary.data.groups.length, 5, '词典应按 5 个分类分组');
  glossary.onSearch({ detail: { value: '秒差距' } });
  assert.strictEqual(glossary.data.resultCount, 1, '词典搜索“秒差距”应返回 1 条');
  glossary.onSearch({ detail: { value: '' } });
  glossary.selectLecture({ currentTarget: { dataset: { value: 'lecture-4' } } });
  assert.ok(glossary.data.resultCount > 0, '按第 4 讲筛选应有词条');

  const detail = instantiate(loadPage('miniprogram/pages/glossary-detail/glossary-detail.js'));
  detail.onLoad({ id: 'parsec' });
  assert.strictEqual(detail.data.notFound, false, '秒差距详情不应为 notFound');
  assert.strictEqual(detail.data.item.term, '秒差距', '详情词条错误');
  assert.ok(detail.data.contexts.length > 0, '秒差距应有讲次语境');

  const frb = instantiate(loadPage('miniprogram/pages/glossary-detail/glossary-detail.js'));
  frb.onLoad({ id: 'frb' });
  assert.strictEqual(frb.data.relatedQuestions.length, 1, '快速射电暴词条应链接未解之谜');
}

function testEntities() {
  const list = instantiate(loadPage('miniprogram/pages/entities/entities.js'));
  list.onLoad({ mode: 'person' });
  assert.strictEqual(list.data.items.length, 39, '人物列表应有 39 位');
  assert.strictEqual(list.data.pageMeta.title, '人物与装置', '人物页大标题错误');
  list.selectMode({ currentTarget: { dataset: { mode: 'device' } } });
  assert.strictEqual(list.data.items.length, 6, '装置列表应有 6 个');
  list.selectMode({ currentTarget: { dataset: { mode: 'chain' } } });
  assert.strictEqual(list.data.chains.length, 8, '思想链应有 8 条');
  assert.strictEqual(list.data.pageMeta.title, '思想链', '思想链页大标题错误');

  const detail = instantiate(loadPage('miniprogram/pages/entity-detail/entity-detail.js'));
  detail.onLoad({ id: 'fast-device' });
  assert.strictEqual(detail.data.notFound, false, 'FAST 详情不应为 notFound');
  assert.strictEqual(detail.data.item.name, '中国天眼 FAST', 'FAST 详情名称错误');
  assert.strictEqual(detail.data.typeLabel, '装置', 'FAST 应为装置');
  assert.ok(detail.data.item.specs.length >= 4, 'FAST 应有规格');
  assert.ok(detail.data.contexts.length > 0, 'FAST 应有讲次语境');
  assert.ok(detail.data.item.bio, 'FAST 应有装置背景');
  assert.strictEqual(detail.data.item.bioSource, 'supplement', 'FAST 背景应标为课外补充');
  assert.strictEqual(detail.data.relatedQuestions.length, 1, 'FAST 应链接快速射电暴问题');
}

function testExploreAndScale() {
  const explore = instantiate(loadPage('miniprogram/pages/explore/explore.js'));
  assert.strictEqual(explore.data.cards.length, 3, '探索页应有 3 个入口');
  assert.strictEqual(explore.data.scaleCount, 8, '宇宙尺度应有 8 层');
  assert.ok(explore.data.cards.some((card) => card.id === 'timeline' && card.href), '探索页应链接双时间线');
  assert.ok(explore.data.cards.some((card) => card.id === 'questions' && card.href), '探索页应链接未解之谜');

  const scale = instantiate(loadPage('miniprogram/pages/scale/scale.js'));
  scale.onLoad({});
  assert.strictEqual(scale.data.stages.length, 8, '尺度页应有 8 层');
  assert.strictEqual(scale.data.current.id, 'earth', '初始层级应为地球');
  scale.onSliderChange({ detail: { value: 100 } });
  assert.strictEqual(scale.data.current.id, 'cosmic-scale', '滑到末端应到宇宙学尺度');
  scale.next();
  assert.strictEqual(scale.data.current.id, 'cosmic-scale', '边界 next 不应报错');
  scale.previous();
  assert.strictEqual(scale.data.current.id, 'andromeda', '上一级应正常');
}

function testTimeline() {
  const page = instantiate(loadPage('miniprogram/pages/timeline/timeline.js'));
  page.onLoad({});
  assert.strictEqual(page.data.mode, 'cosmic', '时间线默认宇宙时间');
  assert.strictEqual(page.data.currentTrack.events.length, 6, '宇宙时间线应有 6 个节点');
  page.selectMode({ currentTarget: { dataset: { mode: 'human' } } });
  assert.strictEqual(page.data.currentTrack.events.length, 19, '观测史应有 19 个节点');
  page.selectMode({ currentTarget: { dataset: { mode: 'compare' } } });
  assert.strictEqual(page.data.compare, true, '应显示对照说明');
}

function testQuestions() {
  const list = instantiate(loadPage('miniprogram/pages/questions/questions.js'));
  list.onLoad();
  assert.strictEqual(list.data.count, 6, '未解之谜应有 6 条');
  assert.strictEqual(list.data.themes.length, 6, '未解之谜应有 5 个主题加“全部”');
  list.selectTheme({ currentTarget: { dataset: { value: '生命与文明' } } });
  assert.strictEqual(list.data.count, 2, '生命与文明应有 2 条');

  const detail = instantiate(loadPage('miniprogram/pages/question-detail/question-detail.js'));
  detail.onLoad({ id: 'frb-origin' });
  assert.strictEqual(detail.data.notFound, false, '快速射电暴问题不应为 notFound');
  assert.ok(detail.data.item.known && detail.data.item.unknown && detail.data.item.why, '问题详情应有已知/未知/为什么重要');
  assert.ok(detail.data.lectureLinks.length > 0, '问题详情应有课程出处');
  assert.ok(detail.data.termLinks.length > 0, '问题详情应有相关概念');
}

function testDetails() {
  const cases = [
    ['miniprogram/packageL1/pages/lecture/lecture.js', 'lecture-1', null, 'lecture-2'],
    ['miniprogram/packageL1/pages/lecture/lecture.js', 'lecture-2', 'lecture-1', 'lecture-3'],
    ['miniprogram/packageL2/pages/lecture/lecture.js', 'lecture-3', 'lecture-2', 'lecture-4'],
    ['miniprogram/packageL2/pages/lecture/lecture.js', 'lecture-4', 'lecture-3', 'lecture-5'],
    ['miniprogram/packageL3/pages/lecture/lecture.js', 'lecture-5', 'lecture-4', 'lecture-6'],
    ['miniprogram/packageL3/pages/lecture/lecture.js', 'lecture-6', 'lecture-5', 'lecture-7'],
    ['miniprogram/packageL4/pages/lecture/lecture.js', 'lecture-7', 'lecture-6', null]
  ];

  for (const [file, id, prevId, nextId] of cases) {
    const page = instantiate(loadPage(file));
    page.onLoad({ id });
    page.onReady();
    assert.strictEqual(page.data.notFound, false, `${id} 不应为 notFound`);
    assert.strictEqual(page.data.imageUrls.length, 10, `${id} 应有 10 张原页`);
    assert.strictEqual(page.data.prevLecture ? page.data.prevLecture.id : null, prevId, `${id} 上一讲错误`);
    assert.strictEqual(page.data.nextLecture ? page.data.nextLecture.id : null, nextId, `${id} 下一讲错误`);
    assert.ok(page.data.exploreLinks.length >= 1 && page.data.exploreLinks.length <= 3, `${id} 应有 1-3 个继续探索链接`);
  }

  const missing = instantiate(loadPage('miniprogram/packageL4/pages/lecture/lecture.js'));
  missing.onLoad({ id: 'lecture-99' });
  assert.strictEqual(missing.data.notFound, true, '不存在的讲次不应生成详情页');
}

testIndex();
testTopic();
testArchive();
testReferenceAndGlossary();
testEntities();
testExploreAndScale();
testTimeline();
testQuestions();
testDetails();

console.log('页面逻辑冒烟测试通过：首页 / 主线 / 原页 / 索引 / 概念 / 人物装置 / 探索 / 尺度 / 时间线 / 未解之谜 / 7 讲详情');
