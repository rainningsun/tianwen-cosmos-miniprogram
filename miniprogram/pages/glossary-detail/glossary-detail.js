const { getGlossaryById } = require('../../data/glossary');
const { getPublishedLectures } = require('../../data/lectures');
const { getTopicById } = require('../../data/topics');
const { getEntityById } = require('../../data/entities');
const { getQuestionById } = require('../../data/questions');
const { lectureLabel } = require('../../utils/format');

Page({
  data: {
    item: null,
    contexts: [],
    relatedTerms: [],
    relatedEntities: [],
    relatedTopics: [],
    relatedQuestions: [],
    notFound: false
  },

  onLoad(options) {
    const id = options && options.id;
    const item = getGlossaryById(id);
    if (!item) {
      this.setData({ notFound: true });
      return;
    }

    const lectures = getPublishedLectures();
    const contexts = [];
    for (const lecture of lectures) {
      const concept = (lecture.concepts || []).find((entry) => entry.termId === item.id);
      if (!concept) continue;
      contexts.push({
        lectureId: lecture.id,
        order: lecture.order,
        title: lecture.title,
        pagePath: lecture.pagePath,
        term: concept.term,
        desc: concept.desc,
        page: concept.page
      });
    }

    const relatedTerms = (item.relatedTermIds || [])
      .map((termId) => getGlossaryById(termId))
      .filter(Boolean)
      .map((term) => ({ id: term.id, term: term.term, en: term.en }));

    const relatedTopics = (item.relatedTopicIds || [])
      .map((topicId) => getTopicById(topicId))
      .filter(Boolean)
      .map((topic) => ({ id: topic.id, title: topic.title }));

    const relatedEntities = (item.relatedEntityIds || [])
      .map((entityId) => getEntityById(entityId))
      .filter(Boolean)
      .map((entity) => ({ id: entity.id, name: entity.name, type: entity.type }));

    const relatedQuestions = (item.relatedQuestionIds || [])
      .map((questionId) => getQuestionById(questionId))
      .filter(Boolean)
      .map((question) => ({ id: question.id, question: question.question }));

    this.setData({ item, contexts, relatedTerms, relatedEntities, relatedTopics, relatedQuestions, notFound: false });
    wx.setNavigationBarTitle({ title: item.term });
  },

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack();
    } else {
      wx.redirectTo({ url: '/pages/glossary/glossary' });
    }
  },

  openLecture(event) {
    const id = event.currentTarget.dataset.id;
    const lecture = getPublishedLectures().find((item) => item.id === id);
    if (!lecture) return;
    wx.navigateTo({ url: `${lecture.pagePath}?id=${lecture.id}` });
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

  openQuestion(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/question-detail/question-detail?id=${id}` });
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
      title: item ? `${item.term} · 概念词典` : '概念词典 · 天问：宇宙之美',
      path: item ? `/pages/glossary-detail/glossary-detail?id=${item.id}` : '/pages/reference/reference'
    };
  }
});
