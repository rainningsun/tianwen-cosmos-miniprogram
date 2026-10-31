const lectures = [
  {
    id: 'lecture-1',
    order: 1,
    date: '9/17',
    title: '从《天问》到宇宙尺度',
    titleNote: '编者拟题',
    status: 'published',
    pagePath: '/packageL1/pages/lecture/lecture',
    package: 'packageL1',
    keywords: ['《天问》', '宇宙距离阶梯', '哈勃', '脉冲星', 'FAST'],
    cover: '',
    summary: '这一讲从《天问》的追问出发，把“我们如何知道宇宙有多大”拆成可检验的观测步骤：月食让地球的形状显露，埃拉托斯特尼与阿利斯塔克用几何丈量地月与日地距离，勒维特与哈勃把尺度推向星系。后半程转到 FAST：脉冲星、快速射电暴、仙女座星系中的超级气泡与湍流，说明射电观测如何把宇宙尺度与星际物理连在一起。',
    questions: [
      '古人如何从月食与日影判断地球是球体，并量出地月、日地距离？',
      '造父变星的周光关系为什么能把距离尺度推向星系？',
      '仙女座星系中的超级气泡与湍流，怎样把超新星爆炸与星系演化联系起来？',
      '射电望远镜为理解宇宙打开了哪个窗口？'
    ],
    concepts: [
      {
        term: '宇宙距离阶梯',
        desc: '从雷达与激光测距、恒星视差、造父变星，到 Ia 型超新星与红移膨胀模型，逐级校准天体距离的测量体系。',
        page: 28
      },
      {
        term: '秒差距',
        desc: '视差角为 1 角秒时对应的距离；课件写作 1 pc 约 3 光年。',
        page: 28
      },
      {
        term: '造父变星周光关系',
        desc: '造父变星的光变周期与光度相关，可由周期推光度，再比较视亮度求出距离。',
        page: 31
      },
      {
        term: '哈勃膨胀',
        desc: '哈勃把星系距离与退行速度联系起来，观测到宇宙在膨胀。',
        page: 32
      },
      {
        term: '快速射电暴',
        desc: '持续时间极短的射电脉冲，是 FAST 的重要科学目标之一。',
        page: 16
      },
      {
        term: '超级气泡',
        desc: '星系盘中由多颗超新星爆炸和星风撑开的大尺度空腔；仙女座星系中已发现 118 个。',
        page: 45
      },
      {
        term: '湍流',
        desc: '流体在多尺度上的不规则运动；Kolmogorov 1941 的标度分析描述了惯性区的统计规律。',
        page: 40
      },
      {
        term: '星尘',
        desc: '重元素在恒星内部合成，超新星爆炸把它们撒入星际介质；课件以“我们都是星尘”收束。',
        page: 39
      }
    ],
    people: [
      {
        name: '伽利略',
        en: 'Galileo Galilei',
        note: '课件以伽利略与月面观测开篇，展示观测如何改变对天空的认识。',
        page: 2
      },
      {
        name: '埃拉托斯特尼',
        en: 'Eratosthenes',
        note: '亚历山大图书馆馆长；用日影与几何丈量地球。',
        page: 21
      },
      {
        name: '阿利斯塔克',
        en: 'Aristarchus',
        note: '提出最早的日心宇宙模型；用月相几何估计日地距离。',
        page: 23
      },
      {
        name: '亨丽埃塔·勒维特',
        en: 'Henrietta Swan Leavitt',
        note: '发现造父变星的周光关系。',
        page: 31
      },
      {
        name: '哈勃',
        en: 'Edwin Hubble',
        note: '1925 年以仙女座星云等观测把宇宙尺度推远，并发现宇宙在膨胀。',
        page: 32
      }
    ],
    quotes: [
      {
        text: '遂古之初，谁传道之？上下未形，何由考之？',
        author: '《天问》',
        page: 15
      },
      {
        text: 'Beauty is truth, truth beauty — that is all ye know on earth, and all ye need to know.',
        author: 'John Keats（济慈）',
        page: 18
      },
      {
        text: 'We are all made of stardust.',
        author: '课件原文（未标作者）',
        page: 39
      }
    ],
    images: [],
    nextHint: '下一讲把这条认知线索拉长：从托勒密的本轮，到伽利略、开普勒、牛顿，再到爱因斯坦与量子论。'
  }
];

function getPublishedLectures() {
  return lectures
    .filter((lecture) => lecture.status === 'published')
    .sort((a, b) => a.order - b.order);
}

function getNextLecture() {
  return lectures
    .filter((lecture) => lecture.status === 'upcoming')
    .sort((a, b) => a.order - b.order)[0] || null;
}

function getLectureById(id) {
  return lectures.find((lecture) => lecture.id === id) || null;
}

module.exports = {
  lectures,
  getPublishedLectures,
  getNextLecture,
  getLectureById
};
