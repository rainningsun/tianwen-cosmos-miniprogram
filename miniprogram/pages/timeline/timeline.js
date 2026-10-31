const { tracks } = require('../../data/timeline');
const { getPublishedLectures } = require('../../data/lectures');
const { getEntityById } = require('../../data/entities');
const { getGlossaryById } = require('../../data/glossary');
const { lectureLabel } = require('../../utils/format');

const MODES = [
  { id: 'cosmic', label: '宇宙时间' },
  { id: 'human', label: '观测历史' },
  { id: 'compare', label: '对照说明' }
];

Page({
  data: {
    modes: MODES,
    mode: 'cosmic',
    currentTrack: null,
    compare: false,
    cosmicCount: 0,
    humanCount: 0
  },

  onLoad(options) {
    const requested = options && options.mode;
    const mode = ['cosmic', 'human', 'compare'].includes(requested) ? requested : 'cosmic';
    const cosmic = tracks.find((track) => track.id === 'cosmic');
    const human = tracks.find((track) => track.id === 'human');
    this.setData({
      cosmicCount: cosmic ? cosmic.events.length : 0,
      humanCount: human ? human.events.length : 0
    }, () => this.selectModeById(mode));
  },

  selectMode(event) {
    this.selectModeById(event.currentTarget.dataset.mode);
  },

  selectModeById(mode) {
    const track = tracks.find((item) => item.id === mode);
    this.setData({
      mode,
      compare: mode === 'compare',
      currentTrack: track ? this.enrichTrack(track) : null
    });
  },

  enrichTrack(track) {
    const lectureMap = {};
    for (const lecture of getPublishedLectures()) {
      lectureMap[lecture.id] = { label: lectureLabel(lecture.order), title: lecture.title, pagePath: lecture.pagePath };
    }

    return Object.assign({}, track, {
      events: track.events.map((event) => ({
        ...event,
        pageText: event.pages.map((page) => `p.${page}`).join('、'),
        lectureLinks: (event.lectureIds || []).map((id) => {
          const lecture = lectureMap[id];
          return lecture ? { id, label: lecture.label, title: lecture.title } : null;
        }).filter(Boolean),
        entityLinks: (event.relatedEntityIds || []).map((id) => {
          const entity = getEntityById(id);
          return entity ? { id, name: entity.name } : null;
        }).filter(Boolean),
        termLinks: (event.relatedTermIds || []).map((id) => {
          const term = getGlossaryById(id);
          return term ? { id, term: term.term } : null;
        }).filter(Boolean),
        sourceLabel: event.sourceType === 'course' ? '课件依据' : '课外补充',
        sourceClass: event.sourceType === 'course' ? '' : 'source-badge--supplement'
      }))
    });
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
  }
});
