const { questions, getThemes } = require('../../data/questions');
const { getPublishedLectures } = require('../../data/lectures');
const { lectureLabel } = require('../../utils/format');

Page({
  data: {
    themes: getThemes(),
    activeTheme: '全部',
    items: [],
    count: questions.length
  },

  onLoad() {
    const lectureMap = {};
    for (const lecture of getPublishedLectures()) {
      lectureMap[lecture.id] = lectureLabel(lecture.order);
    }
    const items = questions.map((question) => Object.assign({}, question, {
      lectureText: question.lectureIds.map((id) => lectureMap[id]).filter(Boolean).join(' / '),
      pageText: question.pages.map((page) => `p.${page}`).join('、')
    }));
    this.setData({ items, count: items.length });
  },

  selectTheme(event) {
    const theme = event.currentTarget.dataset.value;
    const lectureMap = {};
    for (const lecture of getPublishedLectures()) {
      lectureMap[lecture.id] = lectureLabel(lecture.order);
    }
    const items = questions
      .filter((question) => theme === '全部' || question.theme === theme)
      .map((question) => Object.assign({}, question, {
        lectureText: question.lectureIds.map((id) => lectureMap[id]).filter(Boolean).join(' / '),
        pageText: question.pages.map((page) => `p.${page}`).join('、')
      }));
    this.setData({ activeTheme: theme, items, count: items.length });
  },

  openQuestion(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/question-detail/question-detail?id=${id}` });
  }
});
