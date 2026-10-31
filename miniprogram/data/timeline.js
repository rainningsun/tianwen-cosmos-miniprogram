const tracks = [
  {
    id: 'cosmic',
    title: '宇宙的 138 亿年',
    subtitle: '从暴胀到今天',
    events: [
      {
        id: 'big-bang',
        label: '最初时刻',
        timeLabel: '约 138 亿年前',
        title: '炽热、致密的早期宇宙',
        description: '暴胀是早期演化假说；最初几分钟形成轻元素。',
        lectureIds: ['lecture-3'],
        pages: [20],
        relatedEntityIds: [],
        relatedTermIds: ['cosmic-composition'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'first-minutes',
        label: '最初几分钟',
        timeLabel: '最初几分钟',
        title: '轻元素形成',
        description: '课件写作“主要是氢与氦”。',
        lectureIds: ['lecture-3'],
        pages: [20],
        relatedEntityIds: [],
        relatedTermIds: ['cosmic-composition'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'recombination',
        label: '约 38 万年后',
        timeLabel: '约 38 万年后',
        title: '原子形成，宇宙透明',
        description: '课件标注“留下宇宙微波背景”。',
        lectureIds: ['lecture-3'],
        pages: [20],
        relatedEntityIds: [],
        relatedTermIds: ['cosmic-composition'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'first-stars',
        label: '数亿年后',
        timeLabel: '数亿年后',
        title: '首批恒星和星系形成',
        description: '课件写作“引力推动结构增长”。',
        lectureIds: ['lecture-3'],
        pages: [20],
        relatedEntityIds: [],
        relatedTermIds: ['stardust'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'solar-system',
        label: '约 92 亿年',
        timeLabel: '约 92 亿年',
        title: '太阳、地球与太阳系形成',
        description: '课件宇宙年代图标注约 92 亿年时太阳、地球和太阳系形成。',
        lectureIds: ['lecture-1'],
        pages: [16],
        relatedEntityIds: [],
        relatedTermIds: ['distance-ladder'],
        relatedTopicIds: ['distance-ladder'],
        sourceType: 'course'
      },
      {
        id: 'today',
        label: '今天',
        timeLabel: '今天 · 约 137 亿年',
        title: '加速膨胀的宇宙',
        description: '课件同一页也写作约 138 亿年，并说近几十亿年转为加速；按原文保留。',
        lectureIds: ['lecture-3'],
        pages: [20],
        relatedEntityIds: ['hubble'],
        relatedTermIds: ['hubble-expansion', 'cosmic-composition'],
        relatedTopicIds: ['distance-ladder'],
        sourceType: 'course'
      }
    ]
  },
  {
    id: 'human',
    title: '人类的观测史',
    subtitle: '从日影到 FAST',
    events: [
      {
        id: 'eratosthenes',
        label: '公元前 3 世纪',
        timeLabel: '276—196 BC',
        title: '埃拉托斯特尼丈量地球',
        description: '用日影与几何估计地球；课件把它放在距离阶梯的早期。',
        lectureIds: ['lecture-1'],
        pages: [21, 22],
        relatedEntityIds: ['eratosthenes'],
        relatedTermIds: ['distance-ladder'],
        relatedTopicIds: ['distance-ladder'],
        sourceType: 'course'
      },
      {
        id: 'aristarchus',
        label: '公元前 3 世纪',
        timeLabel: '310—230 BC',
        title: '阿利斯塔克与日心说',
        description: '提出最早的日心宇宙模型，并用月相几何估计日地距离。',
        lectureIds: ['lecture-1'],
        pages: [23, 24],
        relatedEntityIds: ['aristarchus'],
        relatedTermIds: ['heliocentrism', 'distance-ladder'],
        relatedTopicIds: ['distance-ladder', 'three-steps'],
        sourceType: 'course'
      },
      {
        id: 'ptolemy',
        label: '古代',
        timeLabel: '100?—170（课件原文）',
        title: '托勒密与《至大论》',
        description: '以本轮与均轮解释行星运动，课件把它作为古代宇宙论样本。',
        lectureIds: ['lecture-2'],
        pages: [10, 11, 26],
        relatedEntityIds: ['ptolemy'],
        relatedTermIds: ['epicycle'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'copernicus',
        label: '16 世纪',
        timeLabel: '1473—1543',
        title: '哥白尼《天体运行论》',
        description: '把太阳置于中心，改变古代宇宙论的模型结构。',
        lectureIds: ['lecture-2'],
        pages: [15],
        relatedEntityIds: ['copernicus'],
        relatedTermIds: ['heliocentrism'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'galileo',
        label: '17 世纪',
        timeLabel: '1564—1642',
        title: '伽利略的望远镜观测',
        description: '课件以月面观测开篇，并标出 1633 年宗教裁判所审判。',
        lectureIds: ['lecture-1', 'lecture-2'],
        pages: [2, 19],
        relatedEntityIds: ['galileo', 'galileo-telescope'],
        relatedTermIds: ['heliocentrism'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'kepler',
        label: '17 世纪初',
        timeLabel: '17 世纪初',
        title: '开普勒与椭圆轨道',
        description: '以椭圆轨道解释行星运动；课件标出“发现！”与“原理？”。',
        lectureIds: ['lecture-2'],
        pages: [20, 21],
        relatedEntityIds: ['kepler'],
        relatedTermIds: ['kepler-ellipse'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'newton',
        label: '17 世纪后期',
        timeLabel: '17 世纪后期',
        title: '牛顿与《自然哲学的数学原理》',
        description: '万有引力把天体运动纳入统一的力学规律。',
        lectureIds: ['lecture-2'],
        pages: [22],
        relatedEntityIds: ['newton'],
        relatedTermIds: ['discovery-origin-principle'],
        relatedTopicIds: ['three-steps'],
        sourceType: 'course'
      },
      {
        id: 'leavitt',
        label: '20 世纪初',
        timeLabel: '1868—1921',
        title: '勒维特发现周光关系',
        description: '造父变星成为可校准的距离指示器。',
        lectureIds: ['lecture-1'],
        pages: [31],
        relatedEntityIds: ['leavitt'],
        relatedTermIds: ['cepheid'],
        relatedTopicIds: ['distance-ladder'],
        sourceType: 'course'
      },
      {
        id: 'hubble',
        label: '20 世纪',
        timeLabel: '1889—1953',
        title: '哈勃与宇宙膨胀',
        description: '1925 年以仙女座星云等观测把宇宙尺度推远，并发现宇宙在膨胀。',
        lectureIds: ['lecture-1'],
        pages: [32],
        relatedEntityIds: ['hubble'],
        relatedTermIds: ['hubble-expansion'],
        relatedTopicIds: ['distance-ladder'],
        sourceType: 'course'
      },
      {
        id: 'jansky',
        label: '1930 年代',
        timeLabel: '1932',
        title: '央斯基发现射电噪声',
        description: '来自银河系的射电噪声成为射电天文学的起点。',
        lectureIds: ['lecture-4'],
        pages: [12],
        relatedEntityIds: ['jansky'],
        relatedTermIds: ['radio-window'],
        relatedTopicIds: ['tianwen-fast'],
        sourceType: 'course'
      },
      {
        id: 'arecibo',
        label: '1960 年代',
        timeLabel: '1963',
        title: '阿雷西博建成',
        description: '300 米口径射电望远镜，后来发现脉冲星、双中子星与脉冲星行星。',
        lectureIds: ['lecture-4'],
        pages: [20, 21, 25, 26],
        relatedEntityIds: ['arecibo-device'],
        relatedTermIds: ['arecibo', 'pulsar-binary'],
        relatedTopicIds: ['tianwen-fast'],
        sourceType: 'course'
      },
      {
        id: 'voyager',
        label: '1970 年代',
        timeLabel: '1977',
        title: '旅行者号与金唱片',
        description: '两艘旅行者号携带金唱片发射；2018 年旅行者 2 号离开日球层。',
        lectureIds: ['lecture-5'],
        pages: [50, 52],
        relatedEntityIds: ['voyager-device', 'sagan'],
        relatedTermIds: ['voyager-record'],
        relatedTopicIds: ['are-we-alone'],
        sourceType: 'course'
      },
      {
        id: 'fast',
        label: '21 世纪',
        timeLabel: '2016.9',
        title: '中国天眼 FAST 落成',
        description: '500 米口径射电望远镜；课件记录其首批成果与超过 1000 颗新脉冲星。',
        lectureIds: ['lecture-4'],
        pages: [50, 54],
        relatedEntityIds: ['fast-device', 'nan-rendong'],
        relatedTermIds: ['fast', 'fast-discoveries'],
        relatedTopicIds: ['tianwen-fast'],
        sourceType: 'course'
      }
    ]
  }
];

function getTrackById(id) {
  return tracks.find((track) => track.id === id) || null;
}

module.exports = {
  tracks,
  getTrackById
};
