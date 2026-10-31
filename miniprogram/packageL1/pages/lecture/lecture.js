const { getLectureById } = require('../../../data/lectures');

Page({
  data: {
    lecture: null
  },

  onLoad(options) {
    const lecture = getLectureById(options.id || 'lecture-1');
    this.setData({ lecture });
    if (lecture) {
      wx.setNavigationBarTitle({ title: lecture.title });
    }
  }
});
