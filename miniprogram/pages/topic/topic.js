const { topics, getTopicById } = require('../../data/topics');
const { getLectureById } = require('../../data/lectures');
const { getGlossaryById } = require('../../data/glossary');
const { getEntityById } = require('../../data/entities');

Page({
  data: {
    topics: topics.map((topic) => ({ id: topic.id, title: topic.title })),
    activeId: topics[0].id,
    topic: null,
    related: [],
    relatedTerms: [],
    relatedEntities: [],
    exploreLinks: []
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

    const relatedTerms = (topic.relatedGlossaryIds || [])
      .map((termId) => getGlossaryById(termId))
      .filter(Boolean)
      .map((term) => ({ id: term.id, term: term.term }));
    const relatedEntities = (topic.relatedEntityIds || [])
      .map((entityId) => getEntityById(entityId))
      .filter(Boolean)
      .map((entity) => ({ id: entity.id, name: entity.name }));

    this.setData({
      activeId: topic.id,
      topic: Object.assign({}, topic, {
        quoteSource: topic.quote ? `${topic.quote.author} · p.${topic.quote.page}` : ''
      }),
      related,
      relatedTerms,
      relatedEntities,
      exploreLinks: topic.relatedExplore || []
    });
  },

  openLecture(event) {
    const lecture = getLectureById(event.currentTarget.dataset.id);
    if (!lecture || lecture.status !== 'published') return;
    wx.navigateTo({
      url: `${lecture.pagePath}?id=${lecture.id}`
    });
  },

  openTerm(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
  },

  openEntity(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/entity-detail/entity-detail?id=${id}` });
  },

  openExplore(event) {
    const { kind, mode, target } = event.currentTarget.dataset;
    if (kind === 'scale') {
      wx.navigateTo({ url: '/pages/scale/scale' });
    } else if (kind === 'timeline') {
      wx.navigateTo({ url: `/pages/timeline/timeline?mode=${mode || 'cosmic'}` });
    } else if (kind === 'question' && target) {
      wx.navigateTo({ url: `/pages/question-detail/question-detail?id=${target}` });
    }
  },

  onShareAppMessage() {
    const topic = this.data.topic;
    return {
      title: topic ? `${topic.title} · 天问：宇宙之美` : '天问：宇宙之美',
      path: '/pages/topic/topic'
    };
  }
});
