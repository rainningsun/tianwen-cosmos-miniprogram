const { glossary } = require('../../data/glossary');

Page({
  data: {
    query: '',
    results: [],
    searching: false,
    glossaryCount: glossary.length,
    examples: glossary.slice(0, 3)
  },

  onSearch(event) {
    const query = (event.detail.value || '').trim().toLowerCase();
    const results = query
      ? glossary.filter((item) => {
        const haystack = [
          item.term,
          item.en,
          ...(item.aliases || []),
          item.definition,
          item.category
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      }).slice(0, 12)
      : [];
    this.setData({ query: event.detail.value || '', results, searching: Boolean(query) });
  },

  clearSearch() {
    this.setData({ query: '', results: [], searching: false });
  },

  openGlossary() {
    wx.navigateTo({ url: '/pages/glossary/glossary' });
  },

  openTerm(event) {
    const id = event.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/glossary-detail/glossary-detail?id=${id}` });
  },

  openEntities() {
    wx.navigateTo({ url: '/pages/entities/entities' });
  }
});
