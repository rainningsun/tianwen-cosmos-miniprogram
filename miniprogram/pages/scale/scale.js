const { stages } = require('../../data/scale');
const { getGlossaryById } = require('../../data/glossary');
const { getPublishedLectures } = require('../../data/lectures');

function enrichStages() {
  const values = stages.map((stage) => Math.log10(Math.max(1, stage.distanceMeters)));
  const min = Math.min(...values);
  const max = Math.max(...values);
  return stages.map((stage, index) => Object.assign({}, stage, {
    position: max > min ? Math.round(((values[index] - min) / (max - min)) * 100) : 0
  }));
}

Page({
  data: {
    stages: [],
    currentIndex: 0,
    current: null,
    sliderValue: 0,
    total: stages.length,
    relatedTerms: [],
    relatedLectures: []
  },

  onLoad(options) {
    const list = enrichStages();
    const requested = options && options.id;
    const index = requested ? list.findIndex((stage) => stage.id === requested) : 0;
    this.setStages(list, index >= 0 ? index : 0);
  },

  setStages(list, index) {
    const currentIndex = Math.max(0, Math.min(list.length - 1, index));
    this.setData({ stages: list }, () => this.setCurrent(currentIndex));
  },

  setCurrent(index) {
    const current = this.data.stages[index];
    if (!current) return;
    const relatedTerms = (current.relatedTermIds || [])
      .map((id) => getGlossaryById(id))
      .filter(Boolean)
      .map((item) => ({ id: item.id, term: item.term }));
    const relatedLectures = (current.lectureIds || [])
      .map((id) => getPublishedLectures().find((lecture) => lecture.id === id))
      .filter(Boolean)
      .map((lecture) => ({ id: lecture.id, order: lecture.order, title: lecture.title, pagePath: lecture.pagePath }));
    this.setData({
      currentIndex: index,
      current: Object.assign({}, current, {
        sourceLabel: current.sourceType === 'course' ? '课件依据' : '课外补充',
        sourceClass: current.sourceType === 'course' ? '' : 'source-badge--supplement',
        pagesText: current.pages.map((page) => `p.${page}`).join('、')
      }),
      sliderValue: current.position,
      relatedTerms,
      relatedLectures
    });
  },

  onSliderChanging(event) {
    this.jumpToNearest(event.detail.value);
  },

  onSliderChange(event) {
    this.jumpToNearest(event.detail.value);
  },

  jumpToNearest(value) {
    let nearest = 0;
    let distance = Infinity;
    this.data.stages.forEach((stage, index) => {
      const delta = Math.abs(stage.position - value);
      if (delta < distance) {
        distance = delta;
        nearest = index;
      }
    });
    this.setCurrent(nearest);
  },

  previous() {
    if (this.data.currentIndex <= 0) return;
    this.setCurrent(this.data.currentIndex - 1);
  },

  next() {
    if (this.data.currentIndex >= this.data.total - 1) return;
    this.setCurrent(this.data.currentIndex + 1);
  },

  selectStage(event) {
    this.setCurrent(Number(event.currentTarget.dataset.index));
  },

  openTerm(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
  },

  openLecture(event) {
    const id = event.currentTarget.dataset.id;
    const lecture = getPublishedLectures().find((item) => item.id === id);
    if (!lecture) return;
    wx.navigateTo({ url: `${lecture.pagePath}?id=${lecture.id}` });
  }
});
