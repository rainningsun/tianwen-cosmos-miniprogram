const lectures = [
  {
    id: 'lecture-1',
    order: 1,
    date: '9/17',
    title: '走出地球：宇宙距离阶梯',
    titleNote: '',
    sourcePdf: '第一讲：走出地球：宇宙距离阶梯.pdf',
    status: 'published',
    pagePath: '/packageL1/pages/lecture/lecture',
    package: 'packageL1',
    keywords: ['《天问》', '宇宙距离阶梯', '哈勃', '脉冲星', 'FAST'],
    cover: '/assets/covers/l1.jpg',
    summary: '这一讲从《天问》的追问出发，沿着古人的视线，把“我们如何知道宇宙有多大”拆成可检验的观测步骤：月食让地球的形状显露，埃拉托斯特尼与阿利斯塔克用几何丈量地月与日地距离，勒维特与哈勃把尺度推向星系。后半程转到 FAST：脉冲星、快速射电暴、仙女座星系中的超级气泡与湍流，说明射电观测如何把宇宙尺度与星际物理连在一起。',
    questions: [
      '古人如何从月食与日影判断地球是球体，并量出地月、日地距离？',
      '造父变星的周光关系为什么能把距离尺度推向星系？',
      '仙女座星系中的超级气泡与湍流，怎样把超新星爆炸与星系演化联系起来？',
      '射电望远镜为理解宇宙打开了哪个窗口？'
    ],
    concepts: [
      {
        term: '宇宙距离阶梯',
        termId: 'distance-ladder',
        desc: '从雷达与激光测距、恒星视差、造父变星，到 Ia 型超新星与红移膨胀模型，逐级校准天体距离的测量体系。',
        page: 28
      },
      {
        term: '秒差距',
        termId: 'parsec',
        desc: '视差角为 1 角秒时对应的距离；课件写作 1 pc 约 3 光年。',
        page: 28
      },
      {
        term: '造父变星周光关系',
        termId: 'cepheid',
        desc: '造父变星的光变周期与光度相关，可由周期推光度，再比较视亮度求出距离。',
        page: 31
      },
      {
        term: '哈勃膨胀',
        termId: 'hubble-expansion',
        desc: '哈勃把星系距离与退行速度联系起来，观测到宇宙在膨胀。',
        page: 32
      },
      {
        term: '快速射电暴',
        termId: 'frb',
        desc: '持续时间极短的射电脉冲，是 FAST 的重要科学目标之一。',
        page: 16
      },
      {
        term: '超级气泡',
        termId: 'superbubble',
        desc: '星系盘中由多颗超新星爆炸和星风撑开的大尺度空腔；仙女座星系中已发现 118 个。',
        page: 45
      },
      {
        term: '湍流',
        termId: 'turbulence',
        desc: '流体在多尺度上的不规则运动；Kolmogorov 1941 的标度分析描述了惯性区的统计规律。',
        page: 40
      },
      {
        term: '星尘',
        termId: 'stardust',
        desc: '重元素在恒星内部合成，超新星爆炸把它们撒入星际介质；课件以“我们都是星尘”收束。',
        page: 39
      }
    ],
    people: [
      {
        name: '伽利略',
        en: 'Galileo Galilei',
        entityId: 'galileo',
        note: '课件以伽利略与月面观测开篇，展示观测如何改变对天空的认识。',
        page: 2
      },
      {
        name: '埃拉托斯特尼',
        en: 'Eratosthenes',
        entityId: 'eratosthenes',
        note: '亚历山大图书馆馆长；用日影与几何丈量地球。',
        page: 21
      },
      {
        name: '阿利斯塔克',
        en: 'Aristarchus',
        entityId: 'aristarchus',
        note: '提出最早的日心宇宙模型；用月相几何估计日地距离。',
        page: 23
      },
      {
        name: '亨丽埃塔·勒维特',
        en: 'Henrietta Swan Leavitt',
        entityId: 'leavitt',
        note: '发现造父变星的周光关系。',
        page: 31
      },
      {
        name: '哈勃',
        en: 'Edwin Hubble',
        entityId: 'hubble',
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
    title: '物理简史',
    titleNote: '',
    sourcePdf: '第二讲：物理简史.pdf',
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
        termId: 'epicycle',
        desc: '托勒密用以解释行星运动的几何模型；课件把它放在“模型构建”这一环。',
        page: 10
      },
      {
        term: '日心说',
        termId: 'heliocentrism',
        desc: '哥白尼《天体运行论》把太阳置于中心，取代以地球为中心的宇宙模型。',
        page: 15
      },
      {
        term: '开普勒椭圆',
        termId: 'kepler-ellipse',
        desc: '开普勒以椭圆轨道解释行星运动；课件标出“发现！”与“原理？”。',
        page: 20
      },
      {
        term: '发现—起源—原理',
        termId: 'discovery-origin-principle',
        desc: '课件用三种追问组织科学史：伽利略对应发现，达尔文对应起源，牛顿对应原理。',
        page: 26
      },
      {
        term: '法拉第力线',
        termId: 'faraday-lines',
        desc: '法拉第用“力线”理解电磁感应；课件引他 1822 年自述数学训练不足。',
        page: 27
      },
      {
        term: '麦克斯韦方程',
        termId: 'maxwell-equations',
        desc: '麦克斯韦方程统一电、磁与光；课件称其统一了“天堂的光和尘世的电”。',
        page: 29
      },
      {
        term: '两朵乌云与量子',
        termId: 'two-clouds-quantum',
        desc: '开尔文 1900 年说物理学知识几乎完备，只剩地平线上的两朵小乌云；普朗克随后以能量量子化解释黑体辐射。',
        page: 32
      },
      {
        term: '狭义相对论',
        termId: 'special-relativity',
        desc: '爱因斯坦以光速不变与相对性原理重建时空；课件写出 E=mc² 与洛伦兹变换。',
        page: 40
      }
    ],
    people: [
      {
        name: '托勒密',
        en: 'Ptolemy',
        entityId: 'ptolemy',
        note: '《至大论》作者；课件以本轮与均轮模型作为古代宇宙论的样本。',
        page: 11
      },
      {
        name: '哥白尼',
        en: 'Nicolaus Copernicus',
        entityId: 'copernicus',
        note: '《天体运行论》提出日心模型。',
        page: 15
      },
      {
        name: '伽利略',
        en: 'Galileo Galilei',
        entityId: 'galileo',
        note: '以望远镜观测；课件标出 1633 年宗教裁判所审判。',
        page: 19
      },
      {
        name: '牛顿',
        en: 'Isaac Newton',
        entityId: 'newton',
        note: '《自然哲学的数学原理》与万有引力定律。',
        page: 22
      },
      {
        name: '法拉第 / 麦克斯韦',
        en: 'Michael Faraday / James Clerk Maxwell',
        entityId: 'faraday-maxwell',
        note: '力线与场方程把电、磁、光统一起来。',
        page: 29
      },
      {
        name: '爱因斯坦',
        en: 'Albert Einstein',
        entityId: 'einstein',
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
    title: '人类认知过程和AI历史',
    titleNote: '',
    sourcePdf: '第三讲：人类认知过程和AI历史.pdf',
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
        termId: 'neptune-discovery',
        desc: '天王星观测位置与引力计算不符，勒维耶与亚当斯独立反推未知行星，1846 年伽勒等在预测位置找到海王星。',
        page: 13
      },
      {
        term: '距离阶梯五法',
        termId: 'distance-ladder',
        desc: '雷达与激光测距、恒星视差、造父变星、Ia 型超新星、红移与膨胀模型；相邻方法需重叠样本校准。',
        page: 19
      },
      {
        term: '宇宙构成',
        termId: 'cosmic-composition',
        desc: '课件以暗能量、暗物质与普通物质划分宇宙成分；p.17 写约 73% / 23%，p.20 写 83% / 23% / 4%，数字不一致，按原页保留。',
        page: 17
      },
      {
        term: '图灵测试',
        termId: 'turing-test',
        desc: '1950 年图灵提出以对话行为判断机器能否思考的测试。',
        page: 35
      },
      {
        term: '符号 AI',
        termId: 'symbolic-ai',
        desc: '1960s-80s 以规则、推理与知识表示为核心，专家系统是代表形态。',
        page: 35
      },
      {
        term: '深度学习',
        termId: 'deep-learning',
        desc: 'Hopfield 网络、反向传播、LeNet-5、深度信念网络与 AlexNet 依次推进。',
        page: 37
      },
      {
        term: 'Transformer',
        termId: 'transformer',
        desc: '2017 年提出的注意力架构；随后出现 2018 GPT 与 2022 ChatGPT。',
        page: 38
      },
      {
        term: '物理智觉',
        termId: 'intellitution',
        desc: 'Intellitution = Intelligence + Intuition；AI 是高维空间里的拟合能力，物理是有限心智对世界规律的经济总结。',
        page: 48
      }
    ],
    people: [
      {
        name: '勒维耶与亚当斯',
        en: 'Urbain Le Verrier / John Couch Adams',
        entityId: 'leverrier-adams',
        note: '独立计算海王星的位置；1846 年观测证实。',
        page: 13
      },
      {
        name: '图灵',
        en: 'Alan Turing',
        entityId: 'turing',
        note: '1950 年提出图灵测试。',
        page: 35
      },
      {
        name: '明斯基',
        en: 'Marvin Minsky',
        entityId: 'minsky',
        note: '达特茅斯会议与早期符号 AI 的代表人物。',
        page: 36
      },
      {
        name: '辛顿',
        en: 'Geoffrey Hinton',
        entityId: 'hinton',
        note: '反向传播与深度学习的代表人物。',
        page: 37
      },
      {
        name: '杨立昆',
        en: 'Yann LeCun',
        entityId: 'lecun',
        note: 'LeNet-5 与卷积网络的代表人物。',
        page: 37
      },
      {
        name: '马赫 / 康德',
        en: 'Ernst Mach / Immanuel Kant',
        entityId: 'mach-kant',
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
  },
  {
    id: 'lecture-4',
    order: 4,
    date: '10/15',
    title: '人类超感-中国天眼FAST',
    titleNote: '',
    sourcePdf: '第四讲： 人类超感-中国天眼FAST.pdf',
    status: 'published',
    pagePath: '/packageL2/pages/lecture/lecture',
    package: 'packageL2',
    keywords: ['射电窗口', '阿雷西博', '脉冲星', 'FAST', '南仁东'],
    cover: '/assets/covers/l4.jpg',
    summary: '这一讲从光谱学讲起：牛顿的棱镜、夫琅禾费的暗线、基尔霍夫与本生把谱线变成识别元素的工具，随后打开大气的射电窗口。雅斯基、雷伯与尤恩把射电天文学建立起来；阿雷西博以 300 米口径发现脉冲星、双中子星与首批脉冲星行星。最后转到中国天眼 FAST：南仁东与选址建设、4500 个主动面单元、30 吨馈源舱，以及超过 1000 颗新脉冲星；也讲到阿雷西博的倒塌与“We will carry on.”',
    questions: [
      '光谱学如何从棱镜与暗线，变成识别天体元素的方法？',
      '阿雷西博为什么能发现脉冲星、双中子星与脉冲星行星？',
      'FAST 的主动面、馈源舱与支撑塔解决了哪些工程难题？',
      '阿雷西博倒塌后，“We will carry on”对射电天文意味着什么？'
    ],
    concepts: [
      {
        term: '光谱学',
        termId: 'spectroscopy',
        desc: '牛顿棱镜分光、夫琅禾费暗线、基尔霍夫—本生把吸收与发射谱线同元素对应起来。',
        page: 9
      },
      {
        term: '射电窗口',
        termId: 'radio-window',
        desc: '地球大气只在部分波段透明；射电窗口让地面射电望远镜得以观测宇宙。',
        page: 10
      },
      {
        term: '射电望远镜',
        termId: 'radio-telescope',
        desc: '天线接收射电波，馈源把信号送入终端；信号经傅里叶变换成为频谱。',
        page: 16
      },
      {
        term: '阿雷西博',
        termId: 'arecibo',
        desc: '300 米口径射电望远镜；1958 年由 Gordon 提议、ARPA 支持，1963 年建成。',
        page: 20
      },
      {
        term: '脉冲星与双中子星',
        termId: 'pulsar-binary',
        desc: '高速自转的中子星发出周期性射电脉冲；阿雷西博发现的双中子星为引力波存在提供了证据。',
        page: 25
      },
      {
        term: '脉冲星行星',
        termId: 'pulsar-planets',
        desc: '1992 年 Wolszczan 与 Frail 在 PSR B1257+12 周围发现首批系外行星。',
        page: 26
      },
      {
        term: 'FAST',
        termId: 'fast',
        desc: '500 米口径球面射电望远镜；4500 个主动面单元、30 吨馈源舱、6 座百米支撑塔、10 万根光纤；2011.3-2016.9，投资 11.5 亿（课件原文）。',
        page: 50
      },
      {
        term: 'FAST 科学发现',
        termId: 'fast-discoveries',
        desc: '截至课件写作时已发现超过 1000 颗新脉冲星；HINSA（中性氢窄线自吸收）与 FRB 20190520B 是代表性成果（另见 p.59、p.62）。',
        page: 54
      }
    ],
    people: [
      {
        name: '威廉·戈登',
        en: 'William E. Gordon',
        entityId: 'gordon',
        note: '提出 300 米阿雷西博天线，最初用于电离层雷达研究。',
        page: 21
      },
      {
        name: '泰勒 / 赫尔斯',
        en: 'Joseph Taylor / Russell Hulse',
        entityId: 'taylor-hulse',
        note: '在阿雷西博发现双中子星，为引力辐射提供证据。',
        page: 25
      },
      {
        name: '沃兹赞',
        en: 'Alex Wolszczan',
        entityId: 'wolszczan',
        note: '与 Frail 发现首批脉冲星行星。',
        page: 26
      },
      {
        name: '南仁东',
        en: 'Nan Rendong',
        entityId: 'nan-rendong',
        note: 'FAST 发起与建设的关键人物；课件引用其 2004 年百家讲坛画面。',
        page: 50
      },
      {
        name: '中国天眼 FAST',
        en: 'Five-hundred-meter Aperture Spherical radio Telescope',
        entityId: 'fast-device',
        note: '500 米口径；2016 年 9 月落成，课件称其为世界最灵敏的射电望远镜。',
        page: 50
      },
      {
        name: '阿雷西博望远镜',
        en: 'Arecibo Observatory',
        entityId: 'arecibo-device',
        note: '300 米口径，1963-2020；2020 年倒塌。',
        page: 60
      }
    ],
    quotes: [
      {
        text: 'We will carry on.',
        author: '李菂 · A Tribute to Arecibo',
        page: 61
      },
      {
        text: 'It necessarily follows that gravitational radiation exists and has a quadrupolar nature.',
        author: 'J. Taylor · Nobel speech, 1993',
        page: 25
      },
      {
        text: '“中国天眼”的成功是中国科技崛起的一部分，包含了以南仁东为代表的几代天文学家的艰苦奋斗。我们是这一历史进程的参与者、受益者、更是建设者。',
        author: '课件原文',
        page: 63
      }
    ],
    images: [
      {
        src: '/packageL2/assets/pages/l4-p9.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p9.jpg',
        caption: '光谱学的起源：牛顿棱镜、夫琅禾费暗线、基尔霍夫—本生把谱线与元素对应。',
        page: 9
      },
      {
        src: '/packageL2/assets/pages/l4-p10.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p10.jpg',
        caption: '地球大气的电磁波透过率；射电窗口让地面射电望远镜得以工作。',
        page: 10
      },
      {
        src: '/packageL2/assets/pages/l4-p21.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p21.jpg',
        caption: '阿雷西博的诞生：1958 年 Gordon 提议 300 米天线，ARPA 决定支持。',
        page: 21
      },
      {
        src: '/packageL2/assets/pages/l4-p25.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p25.jpg',
        caption: '阿雷西博发现双中子星；课件引 Taylor 诺贝尔演讲：引力辐射存在且为四极辐射。',
        page: 25
      },
      {
        src: '/packageL2/assets/pages/l4-p26.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p26.jpg',
        caption: 'PSR B1257+12 与首批脉冲星行星；课件同时列出 2019 年诺贝尔物理学奖。',
        page: 26
      },
      {
        src: '/packageL2/assets/pages/l4-p43.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p43.jpg',
        caption: 'FAST 的主动反射面与索网结构。',
        page: 43
      },
      {
        src: '/packageL2/assets/pages/l4-p50.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p50.jpg',
        caption: 'FAST 工程参数：500 米口径、4500 个主动面单元、30 吨馈源舱、6 座支撑塔、10 万根光纤；2011.3-2016.9，11.5 亿（课件原文）。',
        page: 50
      },
      {
        src: '/packageL2/assets/pages/l4-p54.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p54.jpg',
        caption: 'FAST 首批成果：2017 年确认 6 颗脉冲星；截至课件写作时已发现超过 1000 颗新脉冲星。',
        page: 54
      },
      {
        src: '/packageL2/assets/pages/l4-p61.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p61.jpg',
        caption: '《A Tribute to Arecibo》：李菂以“We will carry on.”作结。',
        page: 61
      },
      {
        src: '/packageL2/assets/pages/l4-p62.jpg',
        thumb: '/packageL2/assets/thumbs/l4-p62.jpg',
        caption: 'FRB 20190520B 与 FAST 的科学产出；同页引用人文清华的评论。',
        page: 62
      }
    ],
    nextHint: '下一讲把问题推向“Are we alone?”：SETI、费米悖论、卡尔达肖夫尺度与旅行者金唱片。'
  },
  {
    id: 'lecture-5',
    order: 5,
    date: '10/22',
    title: '搜索地外文明：对人类未来的考古',
    titleNote: '',
    sourcePdf: '第五讲：搜索地外文明：对人类未来的考古.pdf',
    status: 'published',
    pagePath: '/packageL3/pages/lecture/lecture',
    package: 'packageL3',
    keywords: ['SETI', '费米悖论', '卡尔达肖夫尺度', '旅行者金唱片', 'FAST'],
    cover: '/assets/covers/l5.jpg',
    summary: '这一讲从卡尔·萨根与《COSMOS》说起，把“宇宙中是否只有我们”拆成可讨论的问题：菲利普·莫里森说 SETI 是未来的考古学，费米问“Where is everybody?”，Cocconi 与 Morrison 1959 年把搜索指向 21 厘米氢线。课件接着讲德雷克方程、Project Phoenix、Breakthrough Listen、开普勒系外行星普查，以及卡尔达肖夫尺度与戴森球；最后落在旅行者金唱片和 FAST 的 SETI 能力上。',
    questions: [
      '费米悖论问的是什么，为什么“没有看见”本身是一个科学问题？',
      '德雷克方程的每一项分别代表什么，哪一项最难估计？',
      '卡尔达肖夫尺度如何划分技术文明，FAST 能覆盖到哪一级？',
      '旅行者金唱片试图向星际文明传递哪些关于地球的信息？'
    ],
    concepts: [
      {
        term: 'SETI',
        termId: 'seti',
        desc: 'Search for ExtraTerrestrial Intelligence；莫里森称其为“未来的考古学”。',
        page: 6
      },
      {
        term: '费米悖论',
        termId: 'fermi-paradox',
        desc: '费米问“Where is everybody?”；在银河系尺度与漫长时间里，地外文明本应可见，却尚无证据。',
        page: 10
      },
      {
        term: '德雷克方程',
        termId: 'drake-equation',
        desc: 'N = R* fp Ne fl fi fc L；课件把 L 框出并打问号，指向文明寿命的不确定性。',
        page: 20
      },
      {
        term: '星际通讯窗口',
        termId: 'interstellar-window',
        desc: 'Cocconi 与 Morrison 1959 年提出在 21 厘米氢线附近以窄带搜索星际信号。',
        page: 17
      },
      {
        term: '开普勒行星普查',
        termId: 'kepler-census',
        desc: '银河系 ≥1000 亿行星、约 70-280 亿类太阳恒星、≥3 亿潜在宜居类地行星。',
        page: 24
      },
      {
        term: '卡尔达肖夫尺度',
        termId: 'kardashev',
        desc: 'I 类 10^16 W、II 类 10^26 W、III 类 10^36 W；FAST 覆盖临近太阳系的 I 类与近邻银河系的 II 类。',
        page: 41
      },
      {
        term: '戴森球',
        termId: 'dyson-sphere',
        desc: '围绕恒星收集能量的假想结构；课件引用 Dyson 1960 年论文与 KIC 8462852。',
        page: 42
      },
      {
        term: '旅行者金唱片',
        termId: 'voyager-record',
        desc: '1977 年随两艘旅行者号发射；115 张图像、55 种语言问候、音乐与自然声音；封面用 14 颗脉冲星定位太阳。',
        page: 50
      }
    ],
    people: [
      {
        name: '卡尔·萨根',
        en: 'Carl Sagan',
        entityId: 'sagan',
        note: '《COSMOS》作者与主持人；旅行者金唱片选择委员会主席。',
        page: 4
      },
      {
        name: '菲利普·莫里森',
        en: 'Philip Morrison',
        entityId: 'morrison',
        note: '提出“SETI is the archeology of the future”；1959 年与 Cocconi 发表搜索论文。',
        page: 7
      },
      {
        name: '弗兰克·德雷克',
        en: 'Frank Drake',
        entityId: 'drake',
        note: '德雷克方程与 1974 年阿雷西博信息。',
        page: 20
      },
      {
        name: '恩里科·费米',
        en: 'Enrico Fermi',
        entityId: 'fermi',
        note: '提出“Where is everybody?”。',
        page: 10
      },
      {
        name: '卡尔达肖夫',
        en: 'Nikolai Kardashev',
        entityId: 'kardashev',
        note: '提出 I/II/III 类技术文明尺度。',
        page: 41
      },
      {
        name: '吉尔·塔特',
        en: 'Jill Tarter',
        entityId: 'tarter',
        note: 'Project Phoenix 与 SETI 研究的代表人物；电影《Contact》角色原型。',
        page: 30
      }
    ],
    quotes: [
      {
        text: 'SETI is the archeology of the future.',
        author: 'Philip Morrison',
        page: 7
      },
      {
        text: 'Where is everybody?',
        author: 'Enrico Fermi',
        page: 10
      },
      {
        text: '只有遇到星际中的先进文明，飞船才会被发现，唱片才会被播放。',
        author: '卡尔·萨根',
        page: 52
      }
    ],
    images: [
      {
        src: '/packageL3/assets/pages/l5-p4.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p4.jpg',
        caption: '卡尔·萨根（1934-1996）：行星科学、《COSMOS》与核冬天研究。',
        page: 4
      },
      {
        src: '/packageL3/assets/pages/l5-p10.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p10.jpg',
        caption: '费米悖论：“Where is everybody?” 与银河系尺度示意。',
        page: 10
      },
      {
        src: '/packageL3/assets/pages/l5-p17.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p17.jpg',
        caption: 'Cocconi 与 Morrison 1959 年《Searching for Interstellar Communications》；课件标出 21 厘米氢线与窄带搜索。',
        page: 17
      },
      {
        src: '/packageL3/assets/pages/l5-p20.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p20.jpg',
        caption: '德雷克方程 N = R* fp Ne fl fi fc L；课件把 L 框出并打问号。',
        page: 20
      },
      {
        src: '/packageL3/assets/pages/l5-p24.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p24.jpg',
        caption: '开普勒行星普查：银河系 ≥1000 亿行星、约 70-280 亿类太阳恒星、≥3 亿潜在宜居类地行星。',
        page: 24
      },
      {
        src: '/packageL3/assets/pages/l5-p34.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p34.jpg',
        caption: 'Project Phoenix 的 SETI 搜索与 SETI@home。',
        page: 34
      },
      {
        src: '/packageL3/assets/pages/l5-p41.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p41.jpg',
        caption: '卡尔达肖夫尺度：I 类 10^16 W、II 类 10^26 W、III 类 10^36 W；FAST 覆盖 I 类与近邻 II 类。',
        page: 41
      },
      {
        src: '/packageL3/assets/pages/l5-p42.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p42.jpg',
        caption: '戴森球：Dyson 1960 年论文与 KIC 8462852 的光变曲线。',
        page: 42
      },
      {
        src: '/packageL3/assets/pages/l5-p50.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p50.jpg',
        caption: '旅行者金唱片：115 张图像、55 种语言问候、音乐与自然声音；封面用脉冲星定位太阳。',
        page: 50
      },
      {
        src: '/packageL3/assets/pages/l5-p52.jpg',
        thumb: '/packageL3/assets/thumbs/l5-p52.jpg',
        caption: '旅行者 2 号离开日球层；课件引卡尔·萨根：“只有遇到星际中的先进文明，飞船才会被发现，唱片才会被播放。”',
        page: 52
      }
    ],
    nextHint: '下一讲回到“我们从哪里来”：从大爆炸的第一份元素配方，到恒星核合成、r 过程与 FAST 眼中的星际分子。'
  },
  {
    id: 'lecture-6',
    order: 6,
    date: '10/29',
    title: '宇宙元素',
    titleNote: '',
    sourcePdf: '第六讲：宇宙元素.pdf',
    status: 'published',
    pagePath: '/packageL3/pages/lecture/lecture',
    package: 'packageL3',
    keywords: ['宇宙元素', '大爆炸核合成', '恒星核合成', 'r 过程', 'HINSA', '分子宇宙'],
    cover: '/assets/covers/l6.jpg',
    summary: '这一讲把“我们从哪里来”拆成一条元素制造链：大爆炸最初几分钟留下氢、氦和少量锂；恒星在主序、红巨星与渐近巨星支阶段以核聚变制造碳、氧、铁等元素，渐近巨星支的 s 过程慢慢添加中子；超新星把恒星分层抛入星际介质，中子星并合则通过 r 过程制造更重的核素。后半程从原子转向分子：HINSA 用中性氢窄线自吸收测量暗云年龄，FAST 结合费米伽马射线追踪低能宇宙线，ALMA 与空间望远镜则描绘星际分子与河外分子氧气。',
    questions: [
      '大爆炸最初几分钟留下了哪些元素，我们如何从宇宙微波背景读出这份“第一份配方”？',
      '恒星在主序、红巨星与渐近巨星支阶段分别制造哪些元素，s 过程与 r 过程有什么区别？',
      'HINSA 如何用中性氢窄线自吸收测量暗云的年龄？',
      '从星际分子到河外分子氧气，射电与毫米波观测如何追踪宇宙中的元素与化学演化？'
    ],
    concepts: [
      {
        term: '宇宙构成',
        termId: 'cosmic-composition',
        desc: '课件以 ΛCDM 给出约 5% 普通物质、27% 暗物质、68% 暗能量；普通物质是恒星、气体与我们的来源。',
        page: 8
      },
      {
        term: '大爆炸核合成',
        termId: 'big-bang-nucleosynthesis',
        desc: '最初几分钟形成氢约 75%、氦约 25%，锂少于 0.00000005%；38 万年后的微波背景是这份“第一份配方”的余晖。',
        page: 10
      },
      {
        term: '恒星光谱型',
        termId: 'spectroscopy',
        desc: '按吸收线把恒星分为 OBAFGKM，从热蓝到冷红；光谱型是测量表面温度与理解恒星演化的入口。',
        page: 21
      },
      {
        term: '赫罗图',
        termId: 'hr-diagram',
        desc: '以光度与表面温度组织恒星；太阳从主序氢燃烧，经红巨星、核心氦燃烧与 AGB 壳层燃烧，最后暴露核心并冷却为白矮星。',
        page: 25
      },
      {
        term: '恒星核合成',
        termId: 'stellar-nucleosynthesis',
        desc: '太阳以 4p + 2e⁻ → ⁴He + 2νₑ 释放约 26.7 MeV；三重α过程与 CNO 循环继续制造碳、氧等，渐近巨星支的 s 过程缓慢添加中子。',
        page: 26
      },
      {
        term: 'r 过程',
        termId: 'r-process',
        desc: '快中子俘获；中子星并合 GW170817 的千新星与引力波、电磁对应体把重核素的来源放到同一现场。',
        page: 29
      },
      {
        term: '中性氢窄线自吸收',
        termId: 'hinsa',
        desc: 'HINSA 追踪被 H₂ 碰撞冷却的冷中性氢，是测量暗云年龄与星际磁场的探针。',
        page: 41
      },
      {
        term: '分子宇宙',
        termId: 'molecular-universe',
        desc: '从 CH、OH、H₂O、CO 到 O₂ 与 C₆₀，射电与毫米波把星际空间从“原子气体”扩展为分子与化学网络。',
        page: 53
      }
    ],
    people: [
      {
        name: '卡尔·萨根',
        en: 'Carl Sagan',
        entityId: 'sagan',
        note: '与 Ann Druyan 出现在旅行者金唱片叙事中；课件以“一封陌生女人的来信”开篇。',
        page: 3
      },
      {
        name: '彭齐亚斯与威尔逊',
        en: 'Arno Penzias / Robert Wilson',
        entityId: 'penzias-wilson',
        note: '发现宇宙微波背景辐射，1978 年诺贝尔物理学奖；课件在 p.10-11、p.52 引用。',
        page: 10
      },
      {
        name: '赫茨普龙与罗素',
        en: 'Ejnar Hertzsprung / Henry Norris Russell',
        entityId: 'hertzsprung-russell',
        note: '分别提出恒星光度—温度图，后来成为赫罗图。',
        page: 24
      },
      {
        name: '汉斯·贝特',
        en: 'Hans Bethe',
        entityId: 'bethe',
        note: '解释恒星如何通过核聚变发光，1967 年诺贝尔物理学奖。',
        page: 26
      },
      {
        name: '威廉·福勒',
        en: 'W. A. Fowler',
        entityId: 'fowler',
        note: '研究恒星中的核合成与 s 过程，1983 年诺贝尔物理学奖。',
        page: 27
      },
      {
        name: '中国天眼 FAST',
        en: 'Five-hundred-meter Aperture Spherical radio Telescope',
        entityId: 'fast-device',
        note: '以 HINSA 测量暗云年龄与星际磁场，并结合费米伽马射线追踪低能宇宙线。',
        page: 41
      }
    ],
    quotes: [
      {
        text: '太阳，这颗普通而忠厚的恒星，在她眼中，也就是放在伸出的掌心的一根发丝的宽度。',
        author: '李菂《一封陌生女人的来信：由金唱片到SETI》',
        page: 3
      },
      {
        text: 'FAST的测量表明分子云已经克服了磁通量问题，处于超临界状态，挑战了经典模型',
        author: 'Ching, Li* et al. 2022 Nature',
        page: 17
      }
    ],
    images: [
      {
        src: '/packageL3/assets/pages/l6-p02.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p02.jpg',
        caption: '宇宙年代：从大爆炸、原子氢气、首批恒星与星系，到约 92 亿年太阳系形成与 137 亿年的今天；图中标出脉冲星、快速射电暴、黑洞与地外文明等射电目标。',
        page: 2
      },
      {
        src: '/packageL3/assets/pages/l6-p10.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p10.jpg',
        caption: '“第一份配方”：氢约 75%、氦约 25%、锂少于 0.00000005%；右侧为 38 万年后的宇宙微波背景，彭齐亚斯与威尔逊获 1978 年诺贝尔物理学奖。',
        page: 10
      },
      {
        src: '/packageL3/assets/pages/l6-p25.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p25.jpg',
        caption: '太阳在赫罗图上的演化路径：主序氢燃烧、红巨星、核心氦燃烧、AGB 壳层燃烧，最后暴露核心并冷却为白矮星；课件注明为示意图。',
        page: 25
      },
      {
        src: '/packageL3/assets/pages/l6-p26.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p26.jpg',
        caption: '太阳如何发光：4p + 2e⁻ → ⁴He + 2νₑ，Q ≈ 26.7 MeV；三重α过程与 CNO 循环继续制造更重元素，贝特获 1967 年诺贝尔物理学奖。',
        page: 26
      },
      {
        src: '/packageL3/assets/pages/l6-p28.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p28.jpg',
        caption: '爆炸制造并抛撒元素：核心坍缩把恒星分层抛入星际介质，Ia 型超新星制造大量铁与硅酸盐；图为仙后座 A 超新星遗迹。',
        page: 28
      },
      {
        src: '/packageL3/assets/pages/l6-p29.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p29.jpg',
        caption: '中子星并合制造重核：快中子俘获的 r 过程；GW170817（2017）同时给出引力波与电磁对应体，图中标出千新星。',
        page: 29
      },
      {
        src: '/packageL3/assets/pages/l6-p31.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p31.jpg',
        caption: '宇宙物质循环：原子 ↔ 分子 ↔ 恒星形成 ↔ 恒星核聚变 ↔ 死亡与反馈，把星际介质、恒星与元素合成串成闭环。',
        page: 31
      },
      {
        src: '/packageL3/assets/pages/l6-p41.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p41.jpg',
        caption: '中性氢窄线自吸收（HINSA）：冷中性氢被 H₂ 碰撞冷却，形成可测量的吸收线；课件把它用于测量暗云年龄与星际磁场。',
        page: 41
      },
      {
        src: '/packageL3/assets/pages/l6-p53.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p53.jpg',
        caption: '分子宇宙发现历程：从 1937 年的 CH、1963 年的 OH、1970 年的 CO，到 2002/2011 年的 O₂ 与 2004/2010 年的 C₆₀；金色一栏标出 Goldsmith & Li 的氧分子工作。',
        page: 53
      },
      {
        src: '/packageL3/assets/pages/l6-p60.jpg',
        thumb: '/packageL3/assets/thumbs/l6-p60.jpg',
        caption: '河外分子氧气：Mrk 231 的光谱与作者列表；论文标题为“Molecular Oxygen in the Nearest QSO Mrk 231”（ApJ 889:129, 2020）。',
        page: 60
      }
    ],
    nextHint: '课程在这里暂告一段落；后续讲次将按同一套数据与页面结构增量加入。'
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
