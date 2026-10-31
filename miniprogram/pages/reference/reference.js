const { glossary } = require('../../data/glossary');
const { entities, chains } = require('../../data/entities');

Page({
  data: {
    query: '',
    results: [],
    searching: false,
    glossaryCount: glossary.length,
    peopleCount: entities.filter((entity) => entity.type === 'person').length,
    deviceCount: entities.filter((entity) => entity.type === 'device').length,
    chainCount: chains.length,
    examples: glossary.slice(0, 3),
    entityExamples: entities.filter((entity) => entity.type === 'person').slice(0, 3),
    chainExamples: chains.slice(0, 2)
  },

  onSearch(event) {
    const query = (event.detail.value || '').trim().toLowerCase();
    if (!query) {
      this.setData({ query: '', results: [], searching: false });
      return;
    }

    const termResults = glossary
      .filter((item) => [item.term, item.en, ...(item.aliases || []), item.definition, item.category].join(' ').toLowerCase().includes(query))
      .map((item) => ({
        kind: 'term',
        kindLabel: '词条',
        id: item.id,
        title: item.term,
        en: item.en,
        text: item.definition
      }));

    const entityResults = entities
      .filter((item) => [item.name, item.en, item.role, item.category].join(' ').toLowerCase().includes(query))
      .map((item) => ({
        kind: 'entity',
        kindLabel: item.type === 'person' ? '人物' : '装置',
        id: item.id,
        title: item.name,
        en: item.en,
        text: item.role
      }));

    const chainResults = chains
      .filter((item) => [item.title, item.description].join(' ').toLowerCase().includes(query))
      .map((item) => ({
        kind: 'chain',
        kindLabel: '思想链',
        id: item.id,
        title: item.title,
        en: '',
        text: item.description
      }));

    this.setData({
      query: event.detail.value || '',
      results: termResults.concat(entityResults, chainResults).slice(0, 12),
      searching: true
    });
  },

  clearSearch() {
    this.setData({ query: '', results: [], searching: false });
  },

  openResult(event) {
    const { kind, id } = event.currentTarget.dataset;
    if (!id) return;
    if (kind === 'term') {
      wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
    } else if (kind === 'entity') {
      wx.navigateTo({ url: `/pages/entity-detail/entity-detail?id=${id}` });
    } else if (kind === 'chain') {
      wx.navigateTo({ url: '/pages/entities/entities?mode=chain' });
    }
  },

  openGlossary() {
    wx.navigateTo({ url: '/pages/glossary/glossary' });
  },

  openEntities(event) {
    const mode = (event && event.currentTarget && event.currentTarget.dataset.mode) || 'person';
    wx.navigateTo({ url: `/pages/entities/entities?mode=${mode}` });
  }
});
