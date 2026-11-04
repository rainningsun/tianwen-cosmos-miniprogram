const questions = [
  {
    id: 'dark-sector',
    order: 1,
    question: '暗物质和暗能量究竟是什么？',
    kicker: 'DARK SECTOR',
    theme: '宇宙构成',
    known: '课件给出的宇宙构成中，暗能量与暗物质占绝大部分；普通物质只占很小一部分。p.17 写约 73% / 23%，p.20 写 83% / 23% / 4%，第 6 讲 p.8 写作约 5% 普通物质 / 27% 暗物质 / 68% 暗能量；数字不一致，按原文保留。',
    unknown: '它们的本质仍未知；第 6 讲 p.8 明确写“Dark matter’s identity remains unknown”。',
    why: '它们决定了宇宙的膨胀历史和结构形成。',
    lectureIds: ['lecture-3', 'lecture-6'],
    pages: [8, 17, 20],
    relatedTermIds: ['cosmic-composition', 'big-bang-nucleosynthesis'],
    relatedTopicIds: ['three-steps'],
    relatedEntityIds: ['penzias-wilson'],
    sourceType: 'course'
  },
  {
    id: 'frb-origin',
    order: 2,
    question: '快速射电暴从哪里来？',
    kicker: 'FAST RADIO BURSTS',
    theme: '高能现象',
    known: '快速射电暴是持续时间极短的射电脉冲，是 FAST 的重要科学目标之一；FRB 20190520B 是课件列出的代表性成果。',
    unknown: '课件没有给出快速射电暴的最终起源机制；它仍是开放问题。',
    why: '理解其起源会连接致密天体、星际介质与宇宙学距离。',
    lectureIds: ['lecture-1', 'lecture-4'],
    pages: [16, 62],
    relatedTermIds: ['frb', 'fast-discoveries'],
    relatedTopicIds: ['tianwen-fast'],
    relatedEntityIds: ['fast-device'],
    sourceType: 'course'
  },
  {
    id: 'turbulence-prediction',
    order: 3,
    question: '湍流为什么难以预测？',
    kicker: 'TURBULENCE',
    theme: '星际介质',
    known: '课件用 Kolmogorov 1941 的标度分析描述惯性区；仙女座星系的 118 个超级气泡把超新星能量注入与湍流耗散联系起来。',
    unknown: '湍流的细节演化仍难以预测；课件没有给出一个闭合的预言。',
    why: '它影响星际介质的结构、恒星形成与星系演化。',
    lectureIds: ['lecture-1'],
    pages: [40, 41, 45],
    relatedTermIds: ['turbulence', 'superbubble'],
    relatedTopicIds: ['tianwen-fast'],
    relatedEntityIds: [],
    sourceType: 'course'
  },
  {
    id: 'are-we-alone',
    order: 4,
    question: '我们在宇宙中孤独吗？SETI 为什么还没有信号？',
    kicker: 'ARE WE ALONE?',
    theme: '生命与文明',
    known: '课件介绍 SETI、费米悖论、德雷克方程、开普勒行星普查与卡尔达肖夫尺度；旅行者金唱片携带地球信息。',
    unknown: '尚无确认的地外文明信号；德雷克方程中的文明寿命 L 被课件框出并打问号。',
    why: '它把生命、文明与观测能力放进同一个可讨论的框架。',
    lectureIds: ['lecture-5'],
    pages: [10, 20, 24, 50],
    relatedTermIds: ['seti', 'fermi-paradox', 'drake-equation'],
    relatedTopicIds: ['are-we-alone'],
    relatedEntityIds: ['sagan', 'drake', 'morrison'],
    sourceType: 'course'
  },
  {
    id: 'interstellar-travel',
    order: 5,
    question: '人类能走多远？星际航行可能吗？',
    kicker: 'INTERSTELLAR TRAVEL',
    theme: '生命与文明',
    known: '旅行者一号与二号 1977 年发射并携带金唱片；2018 年旅行者 2 号离开日球层。课件用它们讨论星际信息与人类在宇宙中的位置。',
    unknown: '人类能否抵达其他恒星、需要怎样的能量与时间尺度，课件没有给出答案。',
    why: '它把“探索宇宙”从观测问题推向文明尺度的工程问题。',
    lectureIds: ['lecture-5'],
    pages: [50, 52],
    relatedTermIds: ['voyager-record'],
    relatedTopicIds: ['are-we-alone'],
    relatedEntityIds: ['voyager-device', 'sagan'],
    sourceType: 'course'
  },
  {
    id: 'ai-understand-universe',
    order: 6,
    question: 'AI 能真正理解宇宙吗？“拟合”与“直觉”的边界在哪里？',
    kicker: 'INTELLITUTION',
    theme: '智能与认知',
    known: '课件把 Machine Learning 写成“拟合”、Deep Learning 写成“高维非线性拟合”，并把 AI 史从图灵测试讲到 Transformer；海王星则先由数学反推、再由观测证实。',
    unknown: '“拟合”是否等同于理解、AI 是否能拥有物理直觉，课件没有给出确定答案。',
    why: '它关系到人类如何与机器共同认识宇宙，也关系到“物理智觉”的定义。',
    lectureIds: ['lecture-3'],
    pages: [13, 43, 47, 51],
    relatedTermIds: ['intellitution', 'deep-learning', 'transformer'],
    relatedTopicIds: ['intellitution'],
    relatedEntityIds: ['turing', 'hinton', 'lecun'],
    sourceType: 'course'
  }
];

function getQuestionById(id) {
  return questions.find((question) => question.id === id) || null;
}

function getThemes() {
  return ['全部', ...new Set(questions.map((question) => question.theme))];
}

module.exports = {
  questions,
  getQuestionById,
  getThemes
};
