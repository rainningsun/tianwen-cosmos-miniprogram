const { entities, chains } = require('../../data/entities');
const { getPublishedLectures } = require('../../data/lectures');
const { lectureLabel } = require('../../utils/format');

const MODES = [
  { id: 'person', label: '人物' },
  { id: 'device', label: '装置' },
  { id: 'chain', label: '思想链' }
];

const PERSON_CATEGORIES = ['全部', '古代天文', '物理与相对论', '距离阶梯', '射电天文', 'SETI', '中国天眼', '智能与认知'];
const DEVICE_CATEGORIES = ['全部', '光学', '射电', '空间'];

Page({
  data: {
    modes: MODES,
    mode: 'person',
    categories: PERSON_CATEGORIES,
    activeCategory: '全部',
    items: [],
    chains: [],
    counts: {
      people: entities.filter((entity) => entity.type === 'person').length,
      devices: entities.filter((entity) => entity.type === 'device').length,
      chains: chains.length
    }
  },

  onLoad(options) {
    const mode = options && ['person', 'device', 'chain'].includes(options.mode) ? options.mode : 'person';
    this.setData({ mode, activeCategory: '全部' }, () => this.apply());
  },

  selectMode(event) {
    const mode = event.currentTarget.dataset.mode;
    const categories = mode === 'device' ? DEVICE_CATEGORIES : PERSON_CATEGORIES;
    this.setData({ mode, activeCategory: '全部', categories }, () => this.apply());
  },

  selectCategory(event) {
    this.setData({ activeCategory: event.currentTarget.dataset.value }, () => this.apply());
  },

  apply() {
    const lectureMap = {};
    for (const lecture of getPublishedLectures()) {
      lectureMap[lecture.id] = lectureLabel(lecture.order);
    }

    if (this.data.mode === 'chain') {
      const chainItems = chains.map((chain) => ({
        id: chain.id,
        title: chain.title,
        description: chain.description,
        meta: chain.lectureIds.map((id) => lectureMap[id]).filter(Boolean).join(' / '),
        nodes: chain.entityIds.map((id) => {
          const entity = entities.find((item) => item.id === id);
          return entity ? { id: entity.id, name: entity.name, type: entity.type } : null;
        }).filter(Boolean)
      }));
      this.setData({ chains: chainItems, items: [] });
      return;
    }

    const items = entities
      .filter((entity) => entity.type === this.data.mode)
      .filter((entity) => this.data.activeCategory === '全部' || entity.category === this.data.activeCategory)
      .map((entity) => ({
        id: entity.id,
        name: entity.name,
        en: entity.en,
        mark: entity.name.slice(0, 1),
        role: entity.role,
        meta: entity.lectureIds.map((id) => lectureMap[id]).filter(Boolean).join(' / '),
        pageText: entity.pages.map((page) => `p.${page}`).join('、')
      }));

    this.setData({ items, chains: [] });
  },

  openEntity(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/entity-detail/entity-detail?id=${id}` });
  }
});
