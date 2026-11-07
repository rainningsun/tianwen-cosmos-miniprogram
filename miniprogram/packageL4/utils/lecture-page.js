const { getLectureById, getPublishedLectures } = require('../../data/lectures');
const { lectureLabel } = require('../../utils/format');

const LECTURE_EXPLORE = {
  'lecture-1': [
    { kind: 'scale', title: '宇宙尺度滑杆', note: '从地球到宇宙学尺度，看测量方法如何变化' },
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '把埃拉托斯特尼到哈勃放在一条线上' },
    { kind: 'question', target: 'turbulence-prediction', title: '湍流为什么难以预测？', note: '未解之谜 · 星际介质' }
  ],
  'lecture-2': [
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '从哥白尼、伽利略到牛顿' }
  ],
  'lecture-3': [
    { kind: 'timeline', mode: 'cosmic', title: '宇宙的 138 亿年', note: '从最初时刻到今天的加速膨胀' },
    { kind: 'question', target: 'dark-sector', title: '暗物质和暗能量究竟是什么？', note: '未解之谜 · 宇宙构成' },
    { kind: 'question', target: 'ai-understand-universe', title: 'AI 能真正理解宇宙吗？', note: '未解之谜 · 智能与认知' }
  ],
  'lecture-4': [
    { kind: 'scale', title: '宇宙尺度滑杆', note: '从地球一路走到宇宙学尺度' },
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '从央斯基、阿雷西博到 FAST' },
    { kind: 'question', target: 'frb-origin', title: '快速射电暴从哪里来？', note: '未解之谜 · 高能现象' }
  ],
  'lecture-5': [
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '从日影到旅行者号与 FAST' },
    { kind: 'question', target: 'are-we-alone', title: '我们在宇宙中孤独吗？', note: '未解之谜 · 生命与文明' },
    { kind: 'question', target: 'interstellar-travel', title: '人类能走多远？', note: '未解之谜 · 生命与文明' }
  ],
  'lecture-6': [
    { kind: 'timeline', mode: 'cosmic', title: '宇宙的 138 亿年', note: '从最初几分钟的轻元素到今天的分子宇宙' },
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '从微波背景、21 厘米线到 FAST' },
    { kind: 'question', target: 'dark-sector', title: '暗物质和暗能量究竟是什么？', note: '未解之谜 · 宇宙构成' }
  ],
  'lecture-7': [
    { kind: 'timeline', mode: 'human', title: '观测历史', note: '从脉冲星到 FAST 的快速射电暴' },
    { kind: 'question', target: 'frb-origin', title: '快速射电暴从哪里来？', note: '未解之谜 · 高能现象' },
    { kind: 'timeline', mode: 'cosmic', title: '宇宙的 138 亿年', note: '在宇宙尺度上理解动态宇宙' }
  ]
};

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
      notFound: false,
      exploreLinks: []
    },

    onLoad(options) {
      const query = options || {};
      const id = query.id || 'lecture-1';
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
        focusPages: query.focus === 'pages',
        notFound: false,
        exploreLinks: LECTURE_EXPLORE[lecture.id] || []
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
      const lecture = this.data.lecture;
      const images = (lecture && lecture.images) || [];
      if (!images.length) return;

      const fallback = () => {
        const urls = this.data.imageUrls;
        if (!urls.length) return;
        wx.previewImage({
          current: urls[index] || urls[0],
          urls
        });
      };

      const fs = wx.getFileSystemManager && wx.getFileSystemManager();
      const base = wx.env && wx.env.USER_DATA_PATH;
      if (!fs || !base) {
        fallback();
        return;
      }

      if (!this._previewCache) this._previewCache = {};

      const tasks = images.map((image) => {
        return this.ensurePreviewFile(fs, base, lecture.id, image).catch(() => null);
      });

      Promise.all(tasks).then((paths) => {
        const urls = paths.filter(Boolean);
        if (!urls.length) {
          wx.showToast({ title: '原页加载失败', icon: 'none' });
          return;
        }
        wx.previewImage({
          current: paths[index] || urls[0],
          urls
        });
      }).catch(() => {
        wx.showToast({ title: '原页加载失败', icon: 'none' });
      });
    },

    ensurePreviewFile(fs, base, lectureId, image) {
      const key = `${lectureId}-p${image.page}`;
      if (this._previewCache[key]) {
        return Promise.resolve(this._previewCache[key]);
      }

      const src = String(image.src || '').replace(/^\//, '');
      const dest = `${base}/tianwen-${key}.jpg`;

      return new Promise((resolve, reject) => {
        const done = () => {
          this._previewCache[key] = dest;
          resolve(dest);
        };

        const copy = () => {
          fs.copyFile({
            srcPath: src,
            destPath: dest,
            success: done,
            fail: (error) => {
              if (typeof fs.access !== 'function') {
                reject(error);
                return;
              }
              fs.access({
                path: dest,
                success: done,
                fail: () => reject(error)
              });
            }
          });
        };

        if (typeof fs.access === 'function') {
          fs.access({
            path: dest,
            success: done,
            fail: copy
          });
        } else {
          copy();
        }
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

    goGlossary(event) {
      const termId = event.currentTarget.dataset.termId;
      if (!termId) return;
      wx.navigateTo({
        url: `/pages/glossary-detail/glossary-detail?id=${termId}`
      });
    },

    goEntity(event) {
      const entityId = event.currentTarget.dataset.entityId;
      if (!entityId) return;
      wx.navigateTo({
        url: `/pages/entity-detail/entity-detail?id=${entityId}`
      });
    },

    goExplore(event) {
      const { kind, mode, target } = event.currentTarget.dataset;
      if (kind === 'scale') {
        wx.navigateTo({ url: '/pages/scale/scale' });
      } else if (kind === 'timeline') {
        wx.navigateTo({ url: `/pages/timeline/timeline?mode=${mode || 'cosmic'}` });
      } else if (kind === 'question' && target) {
        wx.navigateTo({ url: `/pages/question-detail/question-detail?id=${target}` });
      }
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
