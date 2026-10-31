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
  instance.setData = function setData(patch) {
    Object.assign(this.data, patch);
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

function testAssignment() {
  const page = instantiate(loadPage('miniprogram/pages/assignment/assignment.js'));
  page.onLoad();
  assert.strictEqual(page.data.totalCount, 17, '灵感清单应为 17 条');
  assert.strictEqual(page.data.checkedCount, 0, '初始勾选应为空');

  page.toggleItem({ currentTarget: { dataset: { id: 'science-1' } } });
  assert.strictEqual(page.data.checkedCount, 1, '勾选后计数应为 1');
  assert.strictEqual(page.data.categories[0].items[0].checked, true, '勾选状态未写入');

  const restored = instantiate(loadPage('miniprogram/pages/assignment/assignment.js'));
  restored.onLoad();
  assert.strictEqual(restored.data.checkedCount, 1, '勾选状态应从本机缓存恢复');

  restored.toggleItem({ currentTarget: { dataset: { id: 'science-1' } } });
  assert.strictEqual(restored.data.checkedCount, 0, '取消勾选后计数应归零');
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
testAssignment();
testDetails();

console.log('页面逻辑冒烟测试通过：首页 / 主线 / 原页 / 作业 / 5 讲详情 / 第六讲占位');
