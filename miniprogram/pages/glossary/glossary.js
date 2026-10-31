const { glossary } = require('../../data/glossary');
const { getPublishedLectures } = require('../../data/lectures');
const { lectureLabel } = require('../../utils/format');

const CATEGORIES = ['全部', '观测与方法', '天体与现象', '物理概念', '装置与技术', '思想与人文'];

function includesQuery(item, query) {
  if (!query) return true;
  const haystack = [
    item.term,
    item.en,
    ...(item.aliases || []),
    item.definition,
    item.category
  ].join(' ').toLowerCase();
  return haystack.includes(query);
}

Page({
  data: {
    query: '',
    categories: CATEGORIES,
    lectures: [],
    activeCategory: '全部',
    activeLecture: 'all',
    groups: [],
    resultCount: 0,
    hasFilters: false
  },

  onLoad() {
    const lectures = getPublishedLectures().map((lecture) => ({
      id: lecture.id,
      label: lectureLabel(lecture.order)
    }));
    this.setData({ lectures }, () => this.applyFilters());
  },

  onSearch(event) {
    this.setData({ query: event.detail.value || '' }, () => this.applyFilters());
  },

  selectCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.value }, () => this.applyFilters());
  },

  selectLecture(event) {
    this.setData({ activeLecture: event.currentTarget.dataset.value }, () => this.applyFilters());
  },

  clearFilters() {
    this.setData({ query: '', activeCategory: '全部', activeLecture: 'all' }, () => this.applyFilters());
  },

  applyFilters() {
    const query = this.data.query.trim().toLowerCase();
    const lectureMap = {};
    for (const lecture of getPublishedLectures()) {
      lectureMap[lecture.id] = lectureLabel(lecture.order);
    }

    const filtered = glossary.filter((item) => {
      if (this.data.activeCategory !== '全部' && item.category !== this.data.activeCategory) return false;
      if (this.data.activeLecture !== 'all' && !item.lectureIds.includes(this.data.activeLecture)) return false;
      return includesQuery(item, query);
    });

    const categories = this.data.activeCategory === '全部'
      ? CATEGORIES.slice(1)
      : [this.data.activeCategory];

    const groups = categories.map((category) => {
      const items = filtered
        .filter((item) => item.category === category)
        .map((item) => ({
          id: item.id,
          term: item.term,
          en: item.en,
          definition: item.definition,
          meta: item.lectureIds.map((id) => lectureMap[id]).join(' / '),
          pageText: item.pages.map((page) => `p.${page}`).join('、')
        }));
      return { category, items };
    }).filter((group) => group.items.length);

    this.setData({
      groups,
      resultCount: filtered.length,
      hasFilters: Boolean(query) || this.data.activeCategory !== '全部' || this.data.activeLecture !== 'all'
    });
  },

  openTerm(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
  }
});
