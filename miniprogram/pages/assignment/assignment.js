const { assignment, getTotalItems } = require('../../data/assignment');

const STORAGE_KEY = 'assignment-checks-v1';

function buildCategories(checks) {
  return assignment.categories.map((category) => Object.assign({}, category, {
    items: category.items.map((item) => Object.assign({}, item, {
      checked: Boolean(checks[item.id])
    }))
  }));
}

Page({
  data: {
    assignment,
    categories: buildCategories({}),
    checkedCount: 0,
    totalCount: getTotalItems(),
    progress: 0
  },

  onLoad() {
    this.restore();
  },

  onShow() {
    this.restore();
  },

  restore() {
    let checks = {};
    try {
      const saved = wx.getStorageSync(STORAGE_KEY);
      if (saved && typeof saved === 'object') {
        checks = saved;
      }
    } catch (error) {
      // 缓存不可用时以空清单开始。
    }
    this.applyChecks(checks);
  },

  applyChecks(checks) {
    const checkedCount = assignment.categories.reduce((sum, category) => {
      return sum + category.items.filter((item) => checks[item.id]).length;
    }, 0);
    const totalCount = getTotalItems();
    this.setData({
      categories: buildCategories(checks),
      checkedCount,
      totalCount,
      progress: totalCount ? Math.round((checkedCount / totalCount) * 100) : 0
    });
  },

  toggleItem(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;

    let checks = {};
    try {
      const saved = wx.getStorageSync(STORAGE_KEY);
      if (saved && typeof saved === 'object') {
        checks = saved;
      }
    } catch (error) {
      // 读取失败时从当前勾选状态重建。
    }

    checks[id] = !checks[id];
    this.applyChecks(checks);

    try {
      wx.setStorageSync(STORAGE_KEY, checks);
    } catch (error) {
      wx.showToast({ title: '本机保存失败', icon: 'none' });
    }
  },

  clearAll() {
    wx.showModal({
      title: '清空勾选进度',
      content: '将清空本机保存的灵感清单，不影响课件内容。',
      confirmText: '清空',
      confirmColor: '#d8a84e',
      success: (result) => {
        if (!result.confirm) return;
        try {
          wx.removeStorageSync(STORAGE_KEY);
        } catch (error) {
          // 清除失败时仍然重置页面状态。
        }
        this.applyChecks({});
      }
    });
  }
});
