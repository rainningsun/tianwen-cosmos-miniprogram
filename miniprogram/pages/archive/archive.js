const { getPublishedLectures, getNextLecture } = require('../../data/lectures');

Page({
  data: {
    lectures: []
  },

  onShow() {
    const published = getPublishedLectures().map((lecture) => ({
      id: lecture.id,
      order: lecture.order,
      title: lecture.title,
      date: lecture.date,
      pagePath: lecture.pagePath,
      count: (lecture.images || []).length,
      status: 'published',
      orderLabel: `第 ${lecture.order} 讲`
    }));

    const upcoming = getNextLecture();
    const future = upcoming
      ? [{
        id: upcoming.id,
        order: upcoming.order,
        title: upcoming.title,
        date: upcoming.date,
        pagePath: '',
        count: 0,
        status: 'upcoming',
        orderLabel: `第 ${upcoming.order} 讲`
      }]
      : [];

    this.setData({ lectures: published.concat(future) });
  },

  openLecture(event) {
    const { id, pagePath } = event.currentTarget.dataset;
    if (!id || !pagePath) return;
    wx.navigateTo({
      url: `${pagePath}?id=${id}&focus=pages`
    });
  }
});
