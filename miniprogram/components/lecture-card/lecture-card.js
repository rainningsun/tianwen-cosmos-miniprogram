Component({
  properties: {
    lecture: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap() {
      if (!this.data.lecture.id) return;
      this.triggerEvent('select', { id: this.data.lecture.id });
    }
  }
});
