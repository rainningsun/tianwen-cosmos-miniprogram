const { getLectureById, getPublishedLectures } = require('../data/lectures');
const { lectureLabel } = require('./format');

function toNavItem(lecture) {
  if (!lecture) return null;
  return {
    id: lecture.id,
    order: lecture.order,
    title: lecture.title,
    pagePath: lecture.pagePath,
    orderLabel: lectureLabel(lecture.order)
  };
}

function createLecturePage() {
  return {
    data: {
      lecture: null,
      prevLecture: null,
      nextLecture: null,
      imageUrls: [],
      focusPages: false,
      notFound: false
    },

    onLoad(options) {
      const id = (options && options.id) || 'lecture-1';
      const lecture = getLectureById(id);
      if (!lecture || lecture.status !== 'published') {
        this.setData({ notFound: true });
        return;
      }

      const published = getPublishedLectures();
      const index = published.findIndex((item) => item.id === lecture.id);
      const prev = index > 0 ? published[index - 1] : null;
      const next = index >= 0 && index < published.length - 1 ? published[index + 1] : null;

      this.setData({
        lecture: Object.assign({}, lecture, {
          orderLabel: lectureLabel(lecture.order),
          keywords: lecture.keywords || [],
          questions: lecture.questions || [],
          concepts: lecture.concepts || [],
          people: lecture.people || [],
          quotes: lecture.quotes || [],
          images: lecture.images || []
        }),
        prevLecture: toNavItem(prev),
        nextLecture: toNavItem(next),
        imageUrls: (lecture.images || []).map((image) => image.src),
        focusPages: options.focus === 'pages',
        notFound: false
      });

      wx.setNavigationBarTitle({ title: lecture.title });
    },

    onReady() {
      if (!this.data.focusPages) return;
      setTimeout(() => {
        wx.pageScrollTo({
          selector: '#pages',
          duration: 280,
          fail: () => {
            const query = wx.createSelectorQuery();
            query.select('#pages').boundingClientRect();
            query.selectViewport().scrollOffset();
            query.exec((result) => {
              const rect = result && result[0];
              const viewport = result && result[1];
              if (!rect || !viewport) return;
              wx.pageScrollTo({
                scrollTop: rect.top + viewport.scrollTop - 12,
                duration: 280
              });
            });
          }
        });
      }, 80);
    },

    previewImage(event) {
      const index = Number(event.currentTarget.dataset.index);
      const urls = this.data.imageUrls;
      if (!urls.length) return;
      wx.previewImage({
        current: urls[index] || urls[0],
        urls
      });
    },

    goLecture(event) {
      const id = event.currentTarget.dataset.id;
      const lecture = getLectureById(id);
      if (!lecture || lecture.status !== 'published') return;
      wx.redirectTo({
        url: `${lecture.pagePath}?id=${lecture.id}`
      });
    },

    goHome() {
      wx.switchTab({ url: '/pages/index/index' });
    },

    onShareAppMessage() {
      const lecture = this.data.lecture;
      if (!lecture) {
        return { title: '天问：宇宙之美 · 课程导览', path: '/pages/index/index' };
      }
      return {
        title: `${lectureLabel(lecture.order)} · ${lecture.title}`,
        path: `${lecture.pagePath}?id=${lecture.id}`
      };
    },

    onShareTimeline() {
      const lecture = this.data.lecture;
      if (!lecture) return { title: '天问：宇宙之美 · 课程导览' };
      return {
        title: `${lectureLabel(lecture.order)} · ${lecture.title}`,
        query: `id=${lecture.id}`
      };
    }
  };
}

module.exports = {
  createLecturePage
};
