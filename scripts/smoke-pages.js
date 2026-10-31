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
  assert.strictEqual(page.data.publishedCount, 5, '已上线讲次应为 5');
  assert.strictEqual(page.data.lectures.length, 5, '首页时间轴应有 5 讲');
  assert.ok(page.data.upcoming, '应显示第六讲占位');
  assert.strictEqual(page.data.upcoming.order, 6, '占位应为第六讲');
}

function testTopic() {
  const page = instantiate(loadPage('miniprogram/pages/topic/topic.js'));
  page.onLoad({});
  page.onShow();
  assert.strictEqual(page.data.topics.length, 6, '应有 6 个思想专题');
  page.selectTopic({ currentTarget: { dataset: { id: 'are-we-alone' } } });
  assert.strictEqual(page.data.topic.id, 'are-we-alone', '专题切换失败');
  assert.ok(page.data.related.length > 0, '专题应有相关讲次');
}

function testArchive() {
  const page = instantiate(loadPage('miniprogram/pages/archive/archive.js'));
  page.onShow();
  assert.strictEqual(page.data.lectures.length, 6, '原页索引应包含 5 讲与占位');
  assert.strictEqual(page.data.lectures[5].status, 'upcoming', '第六讲应为待更新');
}

function testReferenceAndGlossary() {
  const reference = instantiate(loadPage('miniprogram/pages/reference/reference.js'));
  assert.strictEqual(reference.data.glossaryCount, 39, '概念词典应有 39 条');
  assert.strictEqual(reference.data.peopleCount, 30, '人物索引应有 30 位');
  assert.strictEqual(reference.data.deviceCount, 6, '装置索引应有 6 个');
  reference.onSearch({ detail: { value: '秒差距' } });
  assert.strictEqual(reference.data.results.length, 1, '索引搜索“秒差距”应返回 1 条');
  reference.onSearch({ detail: { value: '萨根' } });
  assert.ok(reference.data.results.some((item) => item.kind === 'entity'), '索引搜索“萨根”应返回人物条目');

  const glossary = instantiate(loadPage('miniprogram/pages/glossary/glossary.js'));
  glossary.onLoad();
  assert.strictEqual(glossary.data.resultCount, 39, '词典列表应显示 39 条');
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
}

function testEntities() {
  const list = instantiate(loadPage('miniprogram/pages/entities/entities.js'));
  list.onLoad({ mode: 'person' });
  assert.strictEqual(list.data.items.length, 30, '人物列表应有 30 位');
  list.selectMode({ currentTarget: { dataset: { mode: 'device' } } });
  assert.strictEqual(list.data.items.length, 6, '装置列表应有 6 个');
  list.selectMode({ currentTarget: { dataset: { mode: 'chain' } } });
  assert.strictEqual(list.data.chains.length, 6, '思想链应有 6 条');

  const detail = instantiate(loadPage('miniprogram/pages/entity-detail/entity-detail.js'));
  detail.onLoad({ id: 'fast-device' });
  assert.strictEqual(detail.data.notFound, false, 'FAST 详情不应为 notFound');
  assert.strictEqual(detail.data.item.name, '中国天眼 FAST', 'FAST 详情名称错误');
  assert.strictEqual(detail.data.typeLabel, '装置', 'FAST 应为装置');
  assert.ok(detail.data.item.specs.length >= 4, 'FAST 应有规格');
  assert.ok(detail.data.contexts.length > 0, 'FAST 应有讲次语境');
}

function testExploreAndScale() {
  const explore = instantiate(loadPage('miniprogram/pages/explore/explore.js'));
  assert.strictEqual(explore.data.cards.length, 3, '探索页应有 3 个入口');
  assert.strictEqual(explore.data.scaleCount, 8, '宇宙尺度应有 8 层');
  assert.ok(explore.data.cards.some((card) => card.id === 'timeline' && card.href), '探索页应链接双时间线');

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
  assert.strictEqual(page.data.currentTrack.events.length, 13, '观测史应有 13 个节点');
  page.selectMode({ currentTarget: { dataset: { mode: 'compare' } } });
  assert.strictEqual(page.data.compare, true, '应显示对照说明');
}

function testDetails() {
  const cases = [
    ['miniprogram/packageL1/pages/lecture/lecture.js', 'lecture-1', null, 'lecture-2'],
    ['miniprogram/packageL1/pages/lecture/lecture.js', 'lecture-2', 'lecture-1', 'lecture-3'],
    ['miniprogram/packageL2/pages/lecture/lecture.js', 'lecture-3', 'lecture-2', 'lecture-4'],
    ['miniprogram/packageL2/pages/lecture/lecture.js', 'lecture-4', 'lecture-3', 'lecture-5'],
    ['miniprogram/packageL3/pages/lecture/lecture.js', 'lecture-5', 'lecture-4', null]
  ];

  for (const [file, id, prevId, nextId] of cases) {
    const page = instantiate(loadPage(file));
    page.onLoad({ id });
    page.onReady();
    assert.strictEqual(page.data.notFound, false, `${id} 不应为 notFound`);
    assert.strictEqual(page.data.imageUrls.length, 10, `${id} 应有 10 张原页`);
    assert.strictEqual(page.data.prevLecture ? page.data.prevLecture.id : null, prevId, `${id} 上一讲错误`);
    assert.strictEqual(page.data.nextLecture ? page.data.nextLecture.id : null, nextId, `${id} 下一讲错误`);
  }

  const upcoming = instantiate(loadPage('miniprogram/packageL3/pages/lecture/lecture.js'));
  upcoming.onLoad({ id: 'lecture-6' });
  assert.strictEqual(upcoming.data.notFound, true, '第六讲不应生成详情页');
}

testIndex();
testTopic();
testArchive();
testReferenceAndGlossary();
testEntities();
testExploreAndScale();
testTimeline();
testDetails();

console.log('页面逻辑冒烟测试通过：首页 / 主线 / 原页 / 索引 / 概念 / 人物装置 / 探索 / 尺度 / 时间线 / 5 讲详情 / 第六讲占位');
