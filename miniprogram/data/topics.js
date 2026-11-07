const topics = [
  {
    id: 'three-steps',
    order: 1,
    en: 'THREE STEPS',
    title: '宇宙认知三段论',
    kicker: '从观察到规律',
    layout: 'nodes',
    lede: '课件用三句话概括课程的认识论立场：宇宙有规律，规律可以被人类认知，认知通过观测达成。',
    thesis: '宇宙是有“规律”的；规律是“人类”可以认知的；认知是通过“有意识观测”达成的。',
    source: '第 1 讲 · p.48；第 2 讲 · p.44',
    nodes: [
      {
        label: '规律',
        text: '宇宙不是任意事件的堆积，而是呈现可被提炼的规律。',
        source: '第 1 讲 · p.48'
      },
      {
        label: '认知',
        text: '规律并非只属于神或仪器，人类的心智可以理解它。',
        source: '第 1 讲 · p.48'
      },
      {
        label: '观测',
        text: '理解不是凭空的；它通过有意识的观测达成。',
        source: '第 2 讲 · p.44'
      }
    ],
    sections: [
      {
        title: '从“上下未形”开始',
        text: '《天问》问的是天地未分之时如何考知；课程把这种追问转成一条可操作的认识路径：先承认规律，再相信人类可认知，最后把认知建立在观测上。',
        source: '第 1 讲 · p.15、p.47-48'
      },
      {
        title: '为什么强调“有意识”',
        text: '第 2 讲末页把“观测”写成“有意识观测”，把被动看见与主动设计观测区分开；伽利略的望远镜、阿雷西博与 FAST 都是这种主动观测的延伸。',
        source: '第 2 讲 · p.44；第 4 讲 · p.50'
      },
      {
        title: '三段论不是一条进度条',
        text: '课件并没有说三段论会自动完成；它更像一个循环：新的观测会改写规律，规律又指导下一次观测。此处为编者导读。',
        source: '编者导读'
      }
    ],
    quote: {
      text: '认知是通过“有意识观测”达成的。',
      author: '李菂 · 宇宙认知三段论',
      page: 44
    },
    lectureIds: ['lecture-1', 'lecture-2', 'lecture-4'],
    relatedGlossaryIds: ['discovery-origin-principle', 'intellitution'],
    relatedEntityIds: ['galileo', 'newton'],
    relatedExplore: [
      { kind: 'timeline', mode: 'human', title: '观测历史', note: '从日影到 FAST 的观测史' }
    ]
  },
  {
    id: 'beauty-truth',
    order: 2,
    en: 'BEAUTY ↔ TRUTH',
    title: '美《—》知',
    kicker: '济慈与科学审美',
    layout: 'editorial',
    lede: '课件把济慈的诗句放在课程开篇与第 3 讲，用“美—知”提示科学中的审美判断：一个理论的美，常常与它能否被观测证实纠缠在一起。',
    thesis: 'Beauty is truth, truth beauty — that is all ye know on earth, and all ye need to know.',
    source: '第 1 讲 · p.18；第 3 讲 · p.5；第 6 讲 · p.3、p.64-73；第 7 讲 · p.53',
    sections: [
      {
        title: '为什么把诗放进天文课',
        text: '课件没有把美当作装饰，而是把它作为认知的线索：对称、简洁、可统一，常常引导科学家提出可检验的模型。',
        source: '第 1 讲 · p.18'
      },
      {
        title: '美不是证据',
        text: '诗句可以提示方向，但结论仍要回到观测与页码。第 3 讲用同一句诗开场，随后进入诺贝尔奖、海王星与 AI 史，说明审美与证据并不互相替代。此处为编者导读。',
        source: '第 3 讲 · p.5、p.11-13'
      },
      {
        title: '一个课程内的例子',
        text: '麦克斯韦方程把电、磁与光统一，课件称其统一了“天堂的光和尘世的电”；这类统一感正是“美—知”的典型。',
        source: '第 2 讲 · p.29'
      },
      {
        title: '一封陌生女人的来信',
        text: '第 6 讲以李菂《一封陌生女人的来信：由金唱片到 SETI》开篇，把旅行者 2 号离开日球层写成“一根发丝”的尺度；课程末页收录学生以 FAST 为主题的书画、服装与 AI 歌曲。',
        source: '第 6 讲 · p.3、p.64-73'
      },
      {
        title: '以“美—知”收束',
        text: '第 7 讲末页回到宇宙认知三段论，并以“美《—》知”收束全课程：规律、认知与有意识观测最终落在对宇宙的审美理解上。',
        source: '第 7 讲 · p.53'
      }
    ],
    quote: {
      text: 'Beauty is truth, truth beauty — that is all ye know on earth, and all ye need to know.',
      author: 'John Keats（济慈）',
      page: 18
    },
    lectureIds: ['lecture-1', 'lecture-2', 'lecture-3', 'lecture-6', 'lecture-7'],
    relatedGlossaryIds: ['maxwell-equations', 'voyager-record', 'dynamic-universe'],
    relatedEntityIds: ['faraday-maxwell', 'sagan'],
    relatedExplore: []
  },
  {
    id: 'distance-ladder',
    order: 3,
    en: 'COSMIC DISTANCE LADDER',
    title: '宇宙距离阶梯',
    kicker: '从雷达到红移',
    layout: 'ladder',
    lede: '距离是天文中最难也最基础的数量。课件用一组逐级校准的方法，把太阳系、银河系与遥远星系连成一把尺。',
    thesis: '雷达/激光测距 → 恒星视差 → 造父变星 → Ia 型超新星 → 红移与膨胀模型。',
    source: '第 1 讲 · p.28、p.46；第 3 讲 · p.19',
    steps: [
      {
        title: '雷达与激光测距',
        text: 'd = cΔt/2；用于月球与太阳系天体。',
        source: '第 3 讲 · p.19'
      },
      {
        title: '恒星视差',
        text: 'd(pc) = 1/p(角秒)；用于银河系内恒星。',
        source: '第 3 讲 · p.19；第 1 讲 · p.28'
      },
      {
        title: '造父变星',
        text: '周光关系给出光度，再比较视亮度求距离；用于近邻星系。',
        source: '第 1 讲 · p.31；第 3 讲 · p.19'
      },
      {
        title: 'Ia 型超新星',
        text: '校正峰值光度，作为标准烛光；用于遥远星系与宇宙学尺度。',
        source: '第 3 讲 · p.19'
      },
      {
        title: '红移与膨胀模型',
        text: '哈勃定律把退行速度与距离联系；用于大尺度星系分布。',
        source: '第 1 讲 · p.32；第 3 讲 · p.19'
      }
    ],
    sections: [
      {
        title: '阶梯如何接起来',
        text: '相邻方法需要重叠样本校准，底层误差会向上传递；食双星、水脉泽与红巨星顶端提供交叉检验。',
        source: '第 3 讲 · p.19'
      },
      {
        title: '秒差距是什么',
        text: '视差角为 1 角秒时对应的距离；课件写作 1 pc 约 3 光年。',
        source: '第 1 讲 · p.28'
      },
      {
        title: '哈勃看到了什么',
        text: '课件以仙女座星云等观测把尺度推远，并标注“宇宙在膨胀”。',
        source: '第 1 讲 · p.32'
      }
    ],
    quote: {
      text: '宇宙在膨胀！',
      author: '课件原文 · 哈勃',
      page: 32
    },
    lectureIds: ['lecture-1', 'lecture-3'],
    relatedGlossaryIds: ['parsec', 'cepheid', 'hubble-expansion'],
    relatedEntityIds: ['leavitt', 'hubble'],
    relatedExplore: [
      { kind: 'scale', title: '宇宙尺度滑杆', note: '从地球到宇宙学尺度，看测量方法如何变化' }
    ]
  },
  {
    id: 'tianwen-fast',
    order: 4,
    en: 'FROM TIANWEN TO FAST',
    title: '从《天问》到 FAST',
    kicker: '古人的问题，射电的回答',
    layout: 'timeline',
    lede: '《天问》问天地未形如何考知；几千年后，射电望远镜把这个问题带到射电波段的观测窗口，最后落在贵州山洼里的 500 米口径。',
    thesis: '古人问天 → 射电窗口 → 阿雷西博 → 中国天眼 FAST。',
    source: '第 1 讲 · p.15；第 4 讲 · p.10、p.20、p.50；第 6 讲 · p.41、p.46；第 7 讲 · p.10、p.18、p.31、p.34',
    steps: [
      {
        title: '古人问天',
        text: '《天问》开篇连续发问；课件以“上下未形，何由考之”进入宇宙尺度。',
        source: '第 1 讲 · p.15'
      },
      {
        title: '射电窗口',
        text: '大气只在部分波段透明；射电窗口让地面望远镜看见另一片天空。',
        source: '第 4 讲 · p.10'
      },
      {
        title: '阿雷西博',
        text: '300 米口径，1963 年建成；发现脉冲星、双中子星与首批脉冲星行星。',
        source: '第 4 讲 · p.20-26'
      },
      {
        title: '中国天眼 FAST',
        text: '500 米口径；4500 个主动面单元、30 吨馈源舱；2016 年 9 月落成。',
        source: '第 4 讲 · p.50'
      },
      {
        title: '宇宙元素与分子宇宙',
        text: '第 6 讲把 FAST 的 HINSA 观测接到元素与星际化学：用冷中性氢测量暗云年龄，再结合费米伽马射线追踪低能宇宙线。',
        source: '第 6 讲 · p.41、p.46'
      },
      {
        title: '快速射电暴与动态宇宙',
        text: '第 7 讲从脉冲星讲到 FRB：洛里默暴、FRB 121102 与 FAST 的 CRAFTS 巡天把时域观测推到毫秒尺度。',
        source: '第 7 讲 · p.10、p.18、p.31、p.34'
      }
    ],
    sections: [
      {
        title: '为什么是射电',
        text: '射电波能穿过尘埃，也能覆盖光学看不到的物理过程；课件用大气透过率图说明射电窗口的位置。',
        source: '第 4 讲 · p.10'
      },
      {
        title: 'FAST 的工程尺度',
        text: '4500 个主动面单元、30 吨馈源舱、6 座百米支撑塔、10 万根光纤；课件写作 11.5 亿元、2011.3-2016.9。',
        source: '第 4 讲 · p.50'
      },
      {
        title: '从建成到科学产出',
        text: 'FAST 首批成果确认 6 颗脉冲星；截至课件写作时已发现超过 1000 颗新脉冲星。',
        source: '第 4 讲 · p.54'
      },
      {
        title: '元素、分子与 FAST',
        text: '第 6 讲把元素合成、星际分子与 FAST 观测接在一起：HINSA 测量暗云年龄，FAST 与费米伽马射线测量低能宇宙线电离率；ALMA 与空间望远镜则追踪星际分子和河外分子氧气。',
        source: '第 6 讲 · p.41、p.46、p.53、p.60'
      },
      {
        title: '动态宇宙的毫秒窗口',
        text: 'FRB 在千分之一秒释放相当于一整年的太阳能；CRAFTS 让 FAST 同时巡天脉冲星、中性氢、星系与 FRB，把“动态宇宙”变成可统计的样本。',
        source: '第 7 讲 · p.23、p.34、p.35'
      }
    ],
    quote: {
      text: '“中国天眼”的成功是中国科技崛起的一部分，包含了以南仁东为代表的几代天文学家的艰苦奋斗。',
      author: '课件原文',
      page: 63
    },
    lectureIds: ['lecture-1', 'lecture-4', 'lecture-6', 'lecture-7'],
    relatedGlossaryIds: ['fast', 'arecibo', 'frb', 'hinsa', 'molecular-universe', 'stellar-nucleosynthesis', 'neutron-star', 'repeating-frb', 'crafts', 'dynamic-universe'],
    relatedEntityIds: ['fast-device', 'arecibo-device', 'nan-rendong', 'penzias-wilson', 'lorimer', 'hewich-bell'],
    relatedExplore: [
      { kind: 'timeline', mode: 'human', title: '观测历史', note: '从央斯基、阿雷西博到 FAST' },
      { kind: 'question', target: 'frb-origin', title: '快速射电暴从哪里来？', note: '未解之谜 · 高能现象' }
    ]
  },
  {
    id: 'intellitution',
    order: 5,
    en: 'INTELLITUTION',
    title: '智能、直觉与“物理智觉”',
    kicker: 'AI 的拟合，人类的直觉',
    layout: 'default',
    lede: '第 3 讲把 AI 史压缩成一条从规则到拟合的线索，再用“物理智觉”把它与物理学家的直觉并置。',
    thesis: 'Intellitution = Intelligence + Intuition。',
    source: '第 3 讲 · p.48、p.51',
    sections: [
      {
        title: '拟合是什么',
        text: '课件把 Machine Learning 写成“拟合”、Deep Learning 写成“高维非线性拟合”、大语言模型写成“语言空间中的拟合”。',
        source: '第 3 讲 · p.43'
      },
      {
        title: '直觉是什么',
        text: '课件借康德与马赫说明：概念没有内容会空，直觉没有概念会盲；物理学家在数据与规律之间做经济总结。',
        source: '第 3 讲 · p.47、p.51'
      },
      {
        title: '为什么不是二选一',
        text: 'Thesis 页写道：AI 是高维空间里的拟合能力，物理是有限心智对世界规律的经济总结；Intellitution 是二者的结合，能拟合，也知道该忽略什么。',
        source: '第 3 讲 · p.51'
      },
      {
        title: '一个课程内的例子',
        text: '海王星的发现先用数学反推位置，再由望远镜证实；这既是拟合，也是直觉驱动的观测设计。此处为编者导读。',
        source: '第 3 讲 · p.13'
      }
    ],
    quote: {
      text: 'AI 是高维空间里的拟合能力；物理是有限心智对世界规律的经济总结。INTELLITUTION 是二者的结合：能拟合，也知道该忽略什么。',
      author: '课件原文 · Thesis',
      page: 51
    },
    lectureIds: ['lecture-3'],
    relatedGlossaryIds: ['intellitution', 'deep-learning', 'transformer'],
    relatedEntityIds: ['turing', 'hinton', 'lecun'],
    relatedExplore: [
      { kind: 'question', target: 'ai-understand-universe', title: 'AI 能真正理解宇宙吗？', note: '未解之谜 · 智能与认知' }
    ]
  },
  {
    id: 'are-we-alone',
    order: 6,
    en: 'ARE WE ALONE?',
    title: 'Are we alone?',
    kicker: 'SETI、费米悖论与星际信息',
    layout: 'pause',
    lede: '这一题没有答案，课件把它作为强节奏的停顿：从费米的一句追问，到德雷克方程、卡尔达肖夫尺度与旅行者金唱片。',
    thesis: 'Where is everybody?',
    source: '第 5 讲 · p.10',
    sections: [
      {
        title: 'SETI 是未来的考古学',
        text: '莫里森把 SETI 比作未来的考古学：我们寻找的不是过去的遗迹，而是可能已经抵达的文明信号。',
        source: '第 5 讲 · p.7'
      },
      {
        title: '德雷克方程',
        text: 'N = R* fp Ne fl fi fc L；课件把 L 框出并打问号，说明文明寿命最难估计。',
        source: '第 5 讲 · p.20'
      },
      {
        title: '卡尔达肖夫尺度',
        text: 'I 类 10^16 W、II 类 10^26 W、III 类 10^36 W；FAST 覆盖临近太阳系的 I 类与近邻银河系的 II 类。',
        source: '第 5 讲 · p.41'
      },
      {
        title: '旅行者金唱片',
        text: '1977 年随两艘旅行者号发射；115 张图像、55 种语言问候、音乐与自然声音；封面用 14 颗脉冲星定位太阳。',
        source: '第 5 讲 · p.50'
      }
    ],
    quote: {
      text: '只有遇到星际中的先进文明，飞船才会被发现，唱片才会被播放。',
      author: '卡尔·萨根',
      page: 52
    },
    lectureIds: ['lecture-5'],
    relatedGlossaryIds: ['seti', 'fermi-paradox', 'drake-equation'],
    relatedEntityIds: ['sagan', 'drake', 'morrison'],
    relatedExplore: [
      { kind: 'question', target: 'are-we-alone', title: '我们在宇宙中孤独吗？', note: '未解之谜 · 生命与文明' },
      { kind: 'question', target: 'interstellar-travel', title: '人类能走多远？', note: '未解之谜 · 生命与文明' }
    ]
  }
];

function getTopicById(id) {
  return topics.find((topic) => topic.id === id) || null;
}

module.exports = {
  topics,
  getTopicById
};
