const { getPublishedLectures, getNextLecture, getLectureById } = require('../../data/lectures');
const { lectureLabel } = require('../../utils/format');

const TOPIC_ENTRIES = [
  {
    id: 'three-steps',
    title: '宇宙认知三段论',
    note: '规律、认知与有意识观测'
  },
  {
    id: 'distance-ladder',
    title: '宇宙距离阶梯',
    note: '从视差、造父变星到红移'
  },
  {
    id: 'are-we-alone',
    title: 'Are we alone?',
    note: 'SETI、费米悖论与星际信息'
  }
];

Page({
  data: {
    courseTitle: '天问：宇宙之美',
    lecturer: '李菂',
    publishedCount: 0,
    lectures: [],
    upcoming: null,
    topicEntries: TOPIC_ENTRIES,
    starfieldEnabled: true
  },

  onLoad() {
    const app = getApp();
    this.setData({ starfieldEnabled: app.globalData.starfieldEnabled !== false });
    this.refresh();
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const published = getPublishedLectures();
    const upcoming = getNextLecture();
    const lectures = published.map((lecture) => Object.assign({}, lecture, {
      orderLabel: lectureLabel(lecture.order),
      keywords: lecture.keywords || []
    }));
    const upcomingView = upcoming
      ? Object.assign({}, upcoming, {
        orderLabel: lectureLabel(upcoming.order),
        keywords: []
      })
      : null;

    this.setData({
      publishedCount: lectures.length,
      lectures,
      upcoming: upcomingView
    });
  },

  toggleStarfield() {
    const next = !this.data.starfieldEnabled;
    const app = getApp();
    app.globalData.starfieldEnabled = next;
    this.setData({ starfieldEnabled: next });
    try {
      wx.setStorageSync('starfield-enabled', next);
    } catch (error) {
      // 缓存失败时仅影响下次启动的默认值。
    }
  },

  goLecture(event) {
    const lecture = getLectureById(event.detail.id);
    if (!lecture || lecture.status !== 'published') return;
    wx.navigateTo({
      url: `${lecture.pagePath}?id=${lecture.id}`
    });
  },

  openTopic(event) {
    const id = event.currentTarget.dataset.id;
    try {
      wx.setStorageSync('pending-topic', id);
    } catch (error) {
      // 忽略缓存失败，主线页会显示默认专题。
    }
    wx.switchTab({ url: '/pages/topic/topic' });
  },

  onShareAppMessage() {
    return {
      title: '天问：宇宙之美 · 课程导览',
      path: '/pages/index/index'
    };
  }
});
