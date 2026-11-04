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

const MODE_META = {
  person: {
    eyebrow: 'ENTITIES',
    title: '人物与装置',
    desc: '按人物、装置与思想链整理；角色与规格来自课件，生平/背景为课外补充并单独标注。',
    copyright: '人物与装置条目由编者据课件整理；页码为 PDF 阅读器页码。'
  },
  device: {
    eyebrow: 'ENTITIES',
    title: '人物与装置',
    desc: '按人物、装置与思想链整理；角色与规格来自课件，生平/背景为课外补充并单独标注。',
    copyright: '人物与装置条目由编者据课件整理；页码为 PDF 阅读器页码。'
  },
  chain: {
    eyebrow: 'THOUGHT CHAINS',
    title: '思想链',
    desc: '把人物与装置串成可阅读的线索；节点与讲次来自课件，点节点可回到对应条目。',
    copyright: '思想链由编者据课件人物关系整理；节点可点回人物/装置条目。'
  }
};

Page({
  data: {
    modes: MODES,
    mode: 'person',
    pageMeta: MODE_META.person,
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
    const pageMeta = MODE_META[mode];
    this.setData({ mode, activeCategory: '全部', pageMeta }, () => this.apply());
    wx.setNavigationBarTitle({ title: pageMeta.title });
  },

  selectMode(event) {
    const mode = event.currentTarget.dataset.mode;
    const categories = mode === 'device' ? DEVICE_CATEGORIES : PERSON_CATEGORIES;
    const pageMeta = MODE_META[mode] || MODE_META.person;
    this.setData({ mode, activeCategory: '全部', categories, pageMeta }, () => this.apply());
    wx.setNavigationBarTitle({ title: pageMeta.title });
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
