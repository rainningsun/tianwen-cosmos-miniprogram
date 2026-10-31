const { stages } = require('../../data/scale');
const { tracks } = require('../../data/timeline');
const { questions } = require('../../data/questions');

const cosmic = tracks.find((track) => track.id === 'cosmic');
const human = tracks.find((track) => track.id === 'human');

Page({
  data: {
    scaleCount: stages.length,
    cards: [
      {
        id: 'scale',
        index: '01',
        title: '宇宙尺度',
        question: '从地球到宇宙学尺度，测量方法如何变化？',
        meta: `${stages.length} 个层级`,
        href: '/pages/scale/scale'
      },
      {
        id: 'timeline',
        index: '02',
        title: '双时间线',
        question: '宇宙的 138 亿年与人类的观测史，如何放在一起看？',
        meta: `${cosmic ? cosmic.events.length : 0} + ${human ? human.events.length : 0} 个节点`,
        href: '/pages/timeline/timeline'
      },
      {
        id: 'questions',
        index: '03',
        title: '未解之谜',
        question: '课件留下了哪些没有回答的问题？',
        meta: `${questions.length} 个开放问题`,
        href: '/pages/questions/questions'
      }
    ]
  },

  openCard(event) {
    const href = event.currentTarget.dataset.href;
    if (!href) return;
    wx.navigateTo({ url: href });
  }
});
