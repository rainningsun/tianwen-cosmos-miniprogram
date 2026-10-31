Component({
  properties: {
    lecture: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap() {
      if (this.data.lecture.status !== 'published') return;
      this.triggerEvent('select', { id: this.data.lecture.id });
    }
  }
});
