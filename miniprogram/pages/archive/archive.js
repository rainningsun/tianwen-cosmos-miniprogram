const { getPublishedLectures } = require('../../data/lectures');

Page({
  data: {
    lectures: []
  },

  onShow() {
    this.setData({
      lectures: getPublishedLectures().map((lecture) => ({
        id: lecture.id,
        order: lecture.order,
        title: lecture.title,
        date: lecture.date,
        count: (lecture.images || []).length
      }))
    });
  }
});
