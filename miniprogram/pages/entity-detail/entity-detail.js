const { getEntityById } = require('../../data/entities');
const { getPublishedLectures } = require('../../data/lectures');
const { getGlossaryById } = require('../../data/glossary');
const { getTopicById } = require('../../data/topics');

Page({
  data: {
    item: null,
    typeLabel: '',
    contexts: [],
    relatedEntities: [],
    relatedTerms: [],
    relatedTopics: [],
    notFound: false
  },

  onLoad(options) {
    const id = options && options.id;
    const item = getEntityById(id);
    if (!item) {
      this.setData({ notFound: true });
      return;
    }

    const lectures = getPublishedLectures();
    const contexts = item.lectureIds
      .map((lectureId) => lectures.find((lecture) => lecture.id === lectureId))
      .filter(Boolean)
      .map((lecture) => ({
        id: lecture.id,
        order: lecture.order,
        title: lecture.title,
        pagePath: lecture.pagePath,
        pages: item.pages.map((page) => `p.${page}`).join('、')
      }));

    const relatedEntities = (item.relatedEntityIds || [])
      .map((entityId) => getEntityById(entityId))
      .filter(Boolean)
      .map((entity) => ({ id: entity.id, name: entity.name, type: entity.type }));

    const relatedTerms = (item.relatedTermIds || [])
      .map((termId) => getGlossaryById(termId))
      .filter(Boolean)
      .map((term) => ({ id: term.id, term: term.term }));

    const relatedTopics = (item.relatedTopicIds || [])
      .map((topicId) => getTopicById(topicId))
      .filter(Boolean)
      .map((topic) => ({ id: topic.id, title: topic.title }));

    this.setData({
      item,
      typeLabel: item.type === 'person' ? '人物' : '装置',
      contexts,
      relatedEntities,
      relatedTerms,
      relatedTopics,
      notFound: false
    });
    wx.setNavigationBarTitle({ title: item.name });
  },

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.redirectTo({ url: '/pages/entities/entities' });
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
      title: item ? `${item.name} · 人物与装置` : '人物与装置 · 天问：宇宙之美',
      path: item ? `/pages/entity-detail/entity-detail?id=${item.id}` : '/pages/reference/reference'
    };
  }
});
