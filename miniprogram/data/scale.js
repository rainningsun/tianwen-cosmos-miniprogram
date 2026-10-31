const stages = [
  {
    id: 'earth',
    order: 1,
    title: '地球',
    distanceLabel: '我们的起点',
    distanceMeters: 0,
    method: '地面观测',
    description: '所有天文观测都从地球出发；课件从月食、日影与地球形状开始建立尺度感。',
    lectureIds: ['lecture-1'],
    pages: [19, 20],
    relatedTermIds: ['distance-ladder'],
    sourceType: 'course'
  },
  {
    id: 'earth-moon',
    order: 2,
    title: '地月距离',
    distanceLabel: '约 61 个地球半径',
    distanceMeters: 3.84e8,
    method: '月相几何、激光测距',
    description: '课件用阿利斯塔克的月相几何估计月地距离，并给出约 61 个地球半径；公里数仅作量级换算。',
    lectureIds: ['lecture-1'],
    pages: [23, 24],
    relatedTermIds: ['distance-ladder'],
    sourceType: 'supplement'
  },
  {
    id: 'sun',
    order: 3,
    title: '日地距离',
    distanceLabel: '1 AU ≈ 1.5×10^8 km',
    distanceMeters: 1.5e11,
    method: '雷达/激光测距、几何',
    description: '阿利斯塔克用月相几何估计日地距离；现代雷达测距给出更精确的值。',
    lectureIds: ['lecture-1'],
    pages: [24, 28],
    relatedTermIds: ['distance-ladder', 'parsec'],
    sourceType: 'course'
  },
  {
    id: 'solar-system',
    order: 4,
    title: '太阳系',
    distanceLabel: '约 100 AU 量级',
    distanceMeters: 1.5e13,
    method: '行星轨道与探测器',
    description: '从日地距离扩展到行星轨道与太阳系边界；课件用太阳系图像建立下一级尺度。',
    lectureIds: ['lecture-1'],
    pages: [19, 24],
    relatedTermIds: ['distance-ladder'],
    sourceType: 'supplement'
  },
  {
    id: 'nearest-star',
    order: 5,
    title: '邻近恒星 / 秒差距',
    distanceLabel: '1 pc ≈ 3 光年',
    distanceMeters: 3.086e16,
    method: '恒星视差',
    description: '视差角为 1 角秒时对应的距离为 1 秒差距；这是从太阳系走向恒星尺度的台阶。',
    lectureIds: ['lecture-1'],
    pages: [28],
    relatedTermIds: ['parsec', 'distance-ladder'],
    sourceType: 'course'
  },
  {
    id: 'milky-way',
    order: 6,
    title: '银河系',
    distanceLabel: '约 10 万光年（量级）',
    distanceMeters: 9.5e20,
    method: '恒星计数、银河系结构',
    description: '课件在“宇宙尺度”中列出银河系；这里用常见量级描述其直径，作为尺度示意。',
    lectureIds: ['lecture-1'],
    pages: [19],
    relatedTermIds: ['distance-ladder'],
    sourceType: 'supplement'
  },
  {
    id: 'andromeda',
    order: 7,
    title: '仙女座星系 M31',
    distanceLabel: '约 250 万光年（量级）',
    distanceMeters: 2.4e22,
    method: '造父变星、标准烛光',
    description: '课件以仙女座星系 M31 展示星系尺度与 FAST/JVLA 的观测视野；距离为量级补充。',
    lectureIds: ['lecture-1'],
    pages: [34],
    relatedTermIds: ['cepheid', 'distance-ladder'],
    sourceType: 'supplement'
  },
  {
    id: 'cosmic-scale',
    order: 8,
    title: '宇宙学尺度',
    distanceLabel: '百亿光年量级',
    distanceMeters: 1e26,
    method: '红移与膨胀模型',
    description: '在最大尺度上，距离通过红移与膨胀模型描述；课件保留 137/138 亿年的原文差异。',
    lectureIds: ['lecture-1', 'lecture-3'],
    pages: [28, 19, 20],
    relatedTermIds: ['hubble-expansion', 'distance-ladder', 'cosmic-composition'],
    sourceType: 'supplement'
  }
];

function getStageById(id) {
  return stages.find((stage) => stage.id === id) || null;
}

module.exports = {
  stages,
  getStageById
};
