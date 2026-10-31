const { topics, getTopicById } = require('../../data/topics');
const { getLectureById } = require('../../data/lectures');

Page({
  data: {
    topics: topics.map((topic) => ({ id: topic.id, title: topic.title })),
    activeId: topics[0].id,
    topic: null,
    related: []
  },

  onLoad(options) {
    this.setActive((options && options.topic) || topics[0].id);
  },

  onShow() {
    try {
      const pending = wx.getStorageSync('pending-topic');
      if (pending) {
        wx.removeStorageSync('pending-topic');
        this.setActive(pending);
      }
    } catch (error) {
      // 缓存不可用时保留当前专题。
    }
  },

  selectTopic(event) {
    this.setActive(event.currentTarget.dataset.id);
  },

  setActive(id) {
    const topic = getTopicById(id) || topics[0];
    const related = topic.lectureIds
      .map((lectureId) => getLectureById(lectureId))
      .filter((lecture) => lecture && lecture.status === 'published')
      .map((lecture) => ({
        id: lecture.id,
        order: lecture.order,
        title: lecture.title,
        pagePath: lecture.pagePath
      }));

    this.setData({
      activeId: topic.id,
      topic: Object.assign({}, topic, {
        quoteSource: topic.quote ? `${topic.quote.author} · p.${topic.quote.page}` : ''
      }),
      related
    });
  },

  openLecture(event) {
    const lecture = getLectureById(event.currentTarget.dataset.id);
    if (!lecture || lecture.status !== 'published') return;
    wx.navigateTo({
      url: `${lecture.pagePath}?id=${lecture.id}`
    });
  },

  onShareAppMessage() {
    const topic = this.data.topic;
    return {
      title: topic ? `${topic.title} · 天问：宇宙之美` : '天问：宇宙之美',
      path: '/pages/topic/topic'
    };
  }
});
