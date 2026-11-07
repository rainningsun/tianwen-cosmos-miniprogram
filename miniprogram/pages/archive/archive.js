const { getPublishedLectures } = require('../../data/lectures');

Page({
  data: {
    lectures: []
  },

  onShow() {
    const lectures = getPublishedLectures().map((lecture) => ({
      id: lecture.id,
      order: lecture.order,
      title: lecture.title,
      date: lecture.date,
      pagePath: lecture.pagePath,
      count: (lecture.images || []).length,
      orderLabel: `第 ${lecture.order} 讲`
    }));

    this.setData({ lectures });
  },

  openLecture(event) {
    const { id, pagePath } = event.currentTarget.dataset;
    if (!id || !pagePath) return;
    wx.navigateTo({
      url: `${pagePath}?id=${id}&focus=pages`
    });
  }
});
