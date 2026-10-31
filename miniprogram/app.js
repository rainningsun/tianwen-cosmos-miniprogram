App({
  globalData: {
    courseTitle: '天问：宇宙之美',
    lecturer: '李菂',
    starfieldEnabled: true
  },

  onLaunch() {
    try {
      const saved = wx.getStorageSync('starfield-enabled');
      if (typeof saved === 'boolean') {
        this.globalData.starfieldEnabled = saved;
      }
    } catch (error) {
      // 本地缓存不可用时保持默认设置。
    }
  }
});
