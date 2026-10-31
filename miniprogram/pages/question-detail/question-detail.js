const { getQuestionById } = require('../../data/questions');
const { getPublishedLectures } = require('../../data/lectures');
const { getEntityById } = require('../../data/entities');
const { getGlossaryById } = require('../../data/glossary');
const { getTopicById } = require('../../data/topics');

Page({
  data: {
    item: null,
    lectureLinks: [],
    entityLinks: [],
    termLinks: [],
    topicLinks: [],
    notFound: false
  },

  onLoad(options) {
    const id = options && options.id;
    const item = getQuestionById(id);
    if (!item) {
      this.setData({ notFound: true });
      return;
    }

    const lectures = getPublishedLectures();
    const lectureLinks = (item.lectureIds || [])
      .map((lectureId) => lectures.find((lecture) => lecture.id === lectureId))
      .filter(Boolean)
      .map((lecture) => ({
        id: lecture.id,
        order: lecture.order,
        title: lecture.title,
        pagePath: lecture.pagePath,
        pageText: item.pages.map((page) => `p.${page}`).join('、')
      }));

    const entityLinks = (item.relatedEntityIds || [])
      .map((entityId) => getEntityById(entityId))
      .filter(Boolean)
      .map((entity) => ({ id: entity.id, name: entity.name, type: entity.type }));

    const termLinks = (item.relatedTermIds || [])
      .map((termId) => getGlossaryById(termId))
      .filter(Boolean)
      .map((term) => ({ id: term.id, term: term.term }));

    const topicLinks = (item.relatedTopicIds || [])
      .map((topicId) => getTopicById(topicId))
      .filter(Boolean)
      .map((topic) => ({ id: topic.id, title: topic.title }));

    this.setData({
      item: Object.assign({}, item, {
        pageText: item.pages.map((page) => `p.${page}`).join('、'),
        sourceLabel: item.sourceType === 'course' ? '课件依据' : '课外补充'
      }),
      lectureLinks,
      entityLinks,
      termLinks,
      topicLinks,
      notFound: false
    });
    wx.setNavigationBarTitle({ title: '未解之谜' });
  },

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.redirectTo({ url: '/pages/questions/questions' });
    }
  },

  openLecture(event) {
    const id = event.currentTarget.dataset.id;
    const lecture = getPublishedLectures().find((item) => item.id === id);
    if (!lecture) return;
    wx.navigateTo({ url: `${lecture.pagePath}?id=${lecture.id}` });
  },

  openEntity(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/entity-detail/entity-detail?id=${id}` });
  },

  openTerm(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
  },

  openTopic(event) {
    const id = event.currentTarget.dataset.id;
    try {
      wx.setStorageSync('pending-topic', id);
    } catch (error) {
      // 缓存失败时打开默认专题。
    }
    wx.switchTab({ url: '/pages/topic/topic' });
  },

  onShareAppMessage() {
    const item = this.data.item;
    return {
      title: item ? `${item.question} · 未解之谜` : '未解之谜 · 天问：宇宙之美',
      path: item ? `/pages/question-detail/question-detail?id=${item.id}` : '/pages/explore/explore'
    };
  }
});
