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
    cover: '/assets/covers/l1.jpg',
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
    images: [
      {
        src: '/packageL1/assets/pages/l1-p15.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p15.jpg',
        caption: '《天问》开篇：“遂古之初，谁传道之？上下未形，何由考之？”',
        page: 15
      },
      {
        src: '/packageL1/assets/pages/l1-p16.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p16.jpg',
        caption: '宇宙年代示意：从早期宇宙到“137 亿年”的今天，标出脉冲星、快速射电暴等射电观测目标。',
        page: 16
      },
      {
        src: '/packageL1/assets/pages/l1-p20.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p20.jpg',
        caption: '月食时地球投在月面上的影子呈圆弧，课件以此说明地球是球体。',
        page: 20
      },
      {
        src: '/packageL1/assets/pages/l1-p24.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p24.jpg',
        caption: '阿利斯塔克用月相几何估计日地距离：Ds = 1 AU ≈ 350 D_M ≈ 1.5×10^8 km。',
        page: 24
      },
      {
        src: '/packageL1/assets/pages/l1-p28.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p28.jpg',
        caption: '距离与时间：光速、天文单位、秒差距，以及光度、红移等距离指示。',
        page: 28
      },
      {
        src: '/packageL1/assets/pages/l1-p32.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p32.jpg',
        caption: '哈勃与仙女座星云观测；课件标注“宇宙在膨胀”。',
        page: 32
      },
      {
        src: '/packageL1/assets/pages/l1-p34.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p34.jpg',
        caption: '仙女座星系 M31；课件标注 FAST 与 JVLA 的观测尺度（10,000 光年 / 3,000 pc）。',
        page: 34
      },
      {
        src: '/packageL1/assets/pages/l1-p39.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p39.jpg',
        caption: '蟹状星云与脉冲星；课件引“我们都是星尘（We are all made of stardust）”。',
        page: 39
      },
      {
        src: '/packageL1/assets/pages/l1-p45.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p45.jpg',
        caption: '仙女座星系中的 118 个超级气泡，对应过去约 4000 万年内的约 7000 次超新星爆炸。',
        page: 45
      },
      {
        src: '/packageL1/assets/pages/l1-p48.jpg',
        thumb: '/packageL1/assets/thumbs/l1-p48.jpg',
        caption: '宇宙认知三段论：宇宙有规律；规律是人类可以认知的；认知通过观测达成。',
        page: 48
      }
    ],
    nextHint: '下一讲把这条认知线索拉长：从托勒密的本轮，到伽利略、开普勒、牛顿，再到爱因斯坦与量子论。'
  },
  {
    id: 'lecture-2',
    order: 2,
    date: '9/24',
    title: '认知的阶梯：从托勒密到爱因斯坦',
    titleNote: '编者拟题',
    status: 'published',
    pagePath: '/packageL1/pages/lecture/lecture',
    package: 'packageL1',
    keywords: ['托勒密', '观测', '相对论', '电磁波', '量子'],
    cover: '/assets/covers/l2.jpg',
    summary: '这一讲把“认知的阶梯”铺成一部压缩的科学史：托勒密用本轮解释行星，哥白尼把太阳放回中心，伽利略以观测承受宗教裁判所的压力，开普勒、牛顿给出规律与原理。随后是法拉第、麦克斯韦与赫兹把电、磁和光统一起来，开尔文的两朵乌云引向普朗克与量子。课件用“发现—起源—原理”串起达尔文与爱因斯坦，最后回到宇宙认知三段论：规律、人类可认知、有意识观测。',
    questions: [
      '托勒密的本轮与均轮体系试图解释什么，又为什么会被哥白尼取代？',
      '“发现—起源—原理”三种科学追问，如何分别对应伽利略、达尔文与牛顿？',
      '法拉第的力线与麦克斯韦方程，怎样把“天堂的光”和“尘世的电”统一起来？',
      '开尔文的两朵乌云为什么把物理学引向量子与相对论？'
    ],
    concepts: [
      {
        term: '本轮与均轮',
        desc: '托勒密用以解释行星运动的几何模型；课件把它放在“模型构建”这一环。',
        page: 10
      },
      {
        term: '日心说',
        desc: '哥白尼《天体运行论》把太阳置于中心，取代以地球为中心的宇宙模型。',
        page: 15
      },
      {
        term: '开普勒椭圆',
        desc: '开普勒以椭圆轨道解释行星运动；课件标出“发现！”与“原理？”。',
        page: 20
      },
      {
        term: '发现—起源—原理',
        desc: '课件用三种追问组织科学史：伽利略对应发现，达尔文对应起源，牛顿对应原理。',
        page: 26
      },
      {
        term: '法拉第力线',
        desc: '法拉第用“力线”理解电磁感应；课件引他 1822 年自述数学训练不足。',
        page: 27
      },
      {
        term: '麦克斯韦方程',
        desc: '麦克斯韦方程统一电、磁与光；课件称其统一了“天堂的光和尘世的电”。',
        page: 29
      },
      {
        term: '两朵乌云与量子',
        desc: '开尔文 1900 年说物理学知识几乎完备，只剩地平线上的两朵小乌云；普朗克随后以能量量子化解释黑体辐射。',
        page: 32
      },
      {
        term: '狭义相对论',
        desc: '爱因斯坦以光速不变与相对性原理重建时空；课件写出 E=mc² 与洛伦兹变换。',
        page: 40
      }
    ],
    people: [
      {
        name: '托勒密',
        en: 'Ptolemy',
        note: '《至大论》作者；课件以本轮与均轮模型作为古代宇宙论的样本。',
        page: 11
      },
      {
        name: '哥白尼',
        en: 'Nicolaus Copernicus',
        note: '《天体运行论》提出日心模型。',
        page: 15
      },
      {
        name: '伽利略',
        en: 'Galileo Galilei',
        note: '以望远镜观测；课件标出 1633 年宗教裁判所审判。',
        page: 19
      },
      {
        name: '牛顿',
        en: 'Isaac Newton',
        note: '《自然哲学的数学原理》与万有引力定律。',
        page: 22
      },
      {
        name: '法拉第 / 麦克斯韦',
        en: 'Michael Faraday / James Clerk Maxwell',
        note: '力线与场方程把电、磁、光统一起来。',
        page: 29
      },
      {
        name: '爱因斯坦',
        en: 'Albert Einstein',
        note: '1905 奇迹年与狭义相对论；课件以马赫的认识论为前史。',
        page: 41
      }
    ],
    quotes: [
      {
        text: 'I am unfortunate in a want of mathematical knowledge and the power of entering with facility into abstract reasoning. I am obliged to feel my way by facts closely placed together.',
        author: 'Michael Faraday · 1822',
        page: 43
      },
      {
        text: "The physics knowledge is almost complete. Two small 'clouds' remain over the horizon.",
        author: 'Lord Kelvin · April 1900',
        page: 32
      },
      {
        text: '认知是通过“有意识观测”达成的。',
        author: '李菂 · 宇宙认知三段论',
        page: 44
      }
    ],
    images: [
      {
        src: '/packageL1/assets/pages/l2-p10.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p10.jpg',
        caption: '托勒密的本轮与均轮模型示意。',
        page: 10
      },
      {
        src: '/packageL1/assets/pages/l2-p12.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p12.jpg',
        caption: '课件把距离阶梯的认知条件拆成物理经验、模型构建与逻辑推演。',
        page: 12
      },
      {
        src: '/packageL1/assets/pages/l2-p19.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p19.jpg',
        caption: '伽利略与宗教裁判所；课件标出 1633 年。',
        page: 19
      },
      {
        src: '/packageL1/assets/pages/l2-p20.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p20.jpg',
        caption: '开普勒以椭圆轨道解释行星运动；课件标出“发现！”与“原理？”。',
        page: 20
      },
      {
        src: '/packageL1/assets/pages/l2-p22.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p22.jpg',
        caption: '牛顿《自然哲学的数学原理》与万有引力公式 F=Gm₁m₂/r²。',
        page: 22
      },
      {
        src: '/packageL1/assets/pages/l2-p26.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p26.jpg',
        caption: '“发现—起源—原理”：伽利略、达尔文、牛顿三种追问并列。',
        page: 26
      },
      {
        src: '/packageL1/assets/pages/l2-p29.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p29.jpg',
        caption: '麦克斯韦方程；课件称其统一了“天堂的光和尘世的电”。',
        page: 29
      },
      {
        src: '/packageL1/assets/pages/l2-p32.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p32.jpg',
        caption: '开尔文 1900 年 4 月演讲：“物理学知识几乎完备，只剩两朵小乌云。”',
        page: 32
      },
      {
        src: '/packageL1/assets/pages/l2-p41.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p41.jpg',
        caption: '1905 奇迹年：光电效应、布朗运动、狭义相对论与质能等价四篇论文。',
        page: 41
      },
      {
        src: '/packageL1/assets/pages/l2-p44.jpg',
        thumb: '/packageL1/assets/thumbs/l2-p44.jpg',
        caption: '宇宙认知三段论：规律、人类可认知、有意识观测。',
        page: 44
      }
    ],
    nextHint: '下一讲把镜头推向天文新前沿：海王星的数学预言、距离阶梯五法，以及从 AlphaGo 到 ChatGPT 的智能史。'
  },
  {
    id: 'lecture-3',
    order: 3,
    date: '10/8',
    title: '天文新前沿与智能',
    titleNote: '编者拟题',
    status: 'published',
    pagePath: '/packageL2/pages/lecture/lecture',
    package: 'packageL2',
    keywords: ['海王星', '距离阶梯', 'AI', 'Transformer', '物理智觉'],
    cover: '/assets/covers/l3.jpg',
    summary: '这一讲把天文发现与人工智能放在同一张认知地图上：从海王星“笔尖上的发现”看观测偏差如何反推未知天体，从距离阶梯五法看宇宙尺度如何被逐级校准。随后转入 AI 史，从图灵测试、达特茅斯会议、Hopfield 网络、反向传播，到 LeNet、AlexNet、Transformer 与 ChatGPT。课件把机器学习的“拟合”与物理学的“直觉”并置，提出 Intellitution = Intelligence + Intuition 的“物理智觉”。',
    questions: [
      '海王星为什么被称为“笔尖上的发现”，它体现了怎样的科学方法？',
      '宇宙距离阶梯的五种方法如何逐级衔接？',
      '从符号 AI 到深度学习、Transformer，人工智能的“拟合”能力如何扩展？',
      '“物理智觉”为什么要把智能与直觉放在一起？'
    ],
    concepts: [
      {
        term: '笔尖上的发现',
        desc: '天王星观测位置与引力计算不符，勒维耶与亚当斯独立反推未知行星，1846 年伽勒等在预测位置找到海王星。',
        page: 13
      },
      {
        term: '距离阶梯五法',
        desc: '雷达与激光测距、恒星视差、造父变星、Ia 型超新星、红移与膨胀模型；相邻方法需重叠样本校准。',
        page: 19
      },
      {
        term: '宇宙构成',
        desc: '课件以暗能量、暗物质与普通物质划分宇宙成分；p.17 写约 73% / 23%，p.20 写 83% / 23% / 4%，数字不一致，按原页保留。',
        page: 17
      },
      {
        term: '图灵测试',
        desc: '1950 年图灵提出以对话行为判断机器能否思考的测试。',
        page: 35
      },
      {
        term: '符号 AI',
        desc: '1960s-80s 以规则、推理与知识表示为核心，专家系统是代表形态。',
        page: 35
      },
      {
        term: '深度学习',
        desc: 'Hopfield 网络、反向传播、LeNet-5、深度信念网络与 AlexNet 依次推进。',
        page: 37
      },
      {
        term: 'Transformer',
        desc: '2017 年提出的注意力架构；随后出现 2018 GPT 与 2022 ChatGPT。',
        page: 38
      },
      {
        term: '物理智觉',
        desc: 'Intellitution = Intelligence + Intuition；AI 是高维空间里的拟合能力，物理是有限心智对世界规律的经济总结。',
        page: 48
      }
    ],
    people: [
      {
        name: '勒维耶与亚当斯',
        en: 'Urbain Le Verrier / John Couch Adams',
        note: '独立计算海王星的位置；1846 年观测证实。',
        page: 13
      },
      {
        name: '图灵',
        en: 'Alan Turing',
        note: '1950 年提出图灵测试。',
        page: 35
      },
      {
        name: '明斯基',
        en: 'Marvin Minsky',
        note: '达特茅斯会议与早期符号 AI 的代表人物。',
        page: 36
      },
      {
        name: '辛顿',
        en: 'Geoffrey Hinton',
        note: '反向传播与深度学习的代表人物。',
        page: 37
      },
      {
        name: '杨立昆',
        en: 'Yann LeCun',
        note: 'LeNet-5 与卷积网络的代表人物。',
        page: 37
      },
      {
        name: '马赫 / 康德',
        en: 'Ernst Mach / Immanuel Kant',
        note: '课件借他们的认识论说明直觉、概念与物理原理的关系。',
        page: 47
      }
    ],
    quotes: [
      {
        text: 'Thoughts without content are empty, Intuition without concept are meaningless.',
        author: 'Immanuel Kant',
        page: 47
      },
      {
        text: 'I think therefore I am.',
        author: 'René Descartes',
        page: 47
      },
      {
        text: 'AI 是高维空间里的拟合能力；物理是有限心智对世界规律的经济总结。INTELLITUTION 是二者的结合：能拟合，也知道该忽略什么。',
        author: '课件原文 · Thesis',
        page: 51
      }
    ],
    images: [
      {
        src: '/packageL2/assets/pages/l3-p13.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p13.jpg',
        caption: '海王星“笔尖上的发现”：先发现天王星轨道偏差，再由数学反推位置，1846 年观测证实。',
        page: 13
      },
      {
        src: '/packageL2/assets/pages/l3-p17.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p17.jpg',
        caption: '宇宙构成饼图：暗能量约 73%、暗物质约 23%，其余为普通物质与辐射。',
        page: 17
      },
      {
        src: '/packageL2/assets/pages/l3-p19.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p19.jpg',
        caption: '宇宙测距：距离阶梯五法（雷达/激光、视差、造父变星、Ia 型超新星、红移）。',
        page: 19
      },
      {
        src: '/packageL2/assets/pages/l3-p20.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p20.jpg',
        caption: '“我们现在认识的宇宙”：页内同时写作约 138 亿年与“今天·约 137 亿年”，成分为 83% 暗能量、23% 暗物质、4% 普通物质；按原文保留。',
        page: 20
      },
      {
        src: '/packageL2/assets/pages/l3-p35.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p35.jpg',
        caption: 'AI 历史①：1950 图灵测试、1955/1956 达特茅斯会议、1960s-80s 符号 AI 与专家系统。',
        page: 35
      },
      {
        src: '/packageL2/assets/pages/l3-p37.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p37.jpg',
        caption: 'AI 历史②：1982 Hopfield 网络、1986 反向传播、1998 LeNet-5、2012 AlexNet。',
        page: 37
      },
      {
        src: '/packageL2/assets/pages/l3-p38.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p38.jpg',
        caption: 'AI 历史③：2017 Transformer、2018 GPT、2022 ChatGPT。',
        page: 38
      },
      {
        src: '/packageL2/assets/pages/l3-p41.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p41.jpg',
        caption: 'AI 的起点：牛顿—拉夫森方法与多维损失地形。',
        page: 41
      },
      {
        src: '/packageL2/assets/pages/l3-p48.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p48.jpg',
        caption: '物理智觉：Intellitution = Intelligence + Intuition。',
        page: 48
      },
      {
        src: '/packageL2/assets/pages/l3-p52.jpg',
        thumb: '/packageL2/assets/thumbs/l3-p52.jpg',
        caption: '人·智觉：记忆、创造、灵感、情感、意识；课件以“给岁月以文明？”收束。',
        page: 52
      }
    ],
    nextHint: '下一讲从可见光转向射电窗口：从牛顿棱镜与夫琅禾费暗线，到阿雷西博与中国天眼 FAST。'
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
