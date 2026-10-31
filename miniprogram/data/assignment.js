const assignment = {
  title: '我眼中的宇宙之美',
  source: 'm1015.pdf · p.64-65',
  theme: '以「我眼中的宇宙之美」为主题，结合课程内容，从自己感兴趣的问题出发，通过科学探索、哲学思考、艺术创作等方式，表达自己对宇宙的理解。',
  intro: '请基于自己的专业表达以上主题。表现形式包括但不限于：',
  forms: [
    {
      id: 'form-writing',
      label: '文字作品（须手写）',
      detail: '科学随笔、哲学思辨、科幻小说、诗歌等。'
    },
    {
      id: 'form-art',
      label: '艺术创作',
      detail: '绘画、书法、音乐、摄影、手工制作等。'
    },
    {
      id: 'form-engineering',
      label: '科学与工程实践',
      detail: '数学推导、科学模型、数据分析、数值模拟、工程设计等。'
    },
    {
      id: 'form-other',
      label: '其他形式',
      detail: '请提前与助教联系。'
    }
  ],
  categories: [
    {
      id: 'science',
      index: '01',
      title: '宇宙与科学',
      items: [
        { id: 'science-1', text: '我们如何通过微弱的信号认识遥远的天体？' },
        { id: 'science-2', text: '如果生活在400年前，你会如何证明地球不是宇宙的中心？' },
        { id: 'science-3', text: '为什么简单的数学规律能够描述复杂的宇宙？' },
        { id: 'science-4', text: '脉冲星、超新星、黑洞、快速射电暴等天文现象中的科学之美。' }
      ]
    },
    {
      id: 'philosophy',
      index: '02',
      title: '宇宙与哲学',
      items: [
        { id: 'philosophy-1', text: '如果宇宙中没有任何生命，宇宙还会美吗？' },
        { id: 'philosophy-2', text: '如果 AI 比人类更理解宇宙，科学家还有存在的必要吗？' },
        { id: 'philosophy-3', text: '数学是人类发明的，还是宇宙本身的语言？' },
        { id: 'philosophy-4', text: '我们看到的宇宙就是真实的宇宙吗？科学能够回答所有问题吗？' },
        { id: 'philosophy-5', text: '如果人类永远无法抵达其他恒星，我们为什么还要探索宇宙？' },
        { id: 'philosophy-6', text: '如果宇宙终将走向终结，人类文明的存在还有意义吗？' }
      ]
    },
    {
      id: 'arts',
      index: '03',
      title: '宇宙与人文艺术',
      items: [
        { id: 'arts-1', text: '如果宇宙有声音，你会如何表现它？' },
        { id: 'arts-2', text: '如果能够亲眼见证一颗恒星的一生，你会看到什么？' },
        { id: 'arts-3', text: '如果发现地外文明，人类应该主动与其联系吗？' },
        { id: 'arts-4', text: '以星空、中国天眼或者其他天文现象为主题进行自由艺术创作。' }
      ]
    },
    {
      id: 'engineering',
      index: '04',
      title: '宇宙与工程',
      originalNote: 'p.65 原文作“涉及一台怎样的望远镜”，此处按原文保留。',
      items: [
        { id: 'engineering-1', text: '如果拥有无限经费，你会涉及一台怎样的望远镜？希望用它解决什么科学问题？' },
        { id: 'engineering-2', text: '假如由你领导中国天眼FAST的选址与建设工程，你需要考虑哪些实际问题？会如何解决？' },
        { id: 'engineering-3', text: '假如获得一笔经费用于升级中国天眼FAST的能力（不限于观测能力），你会如何使用？' }
      ]
    }
  ],
  footnote: '选题不限于以上内容，鼓励自由探索！我们期待的并不是标准答案，而是属于你自己的宇宙问题，以及探索它的过程。'
};

function getTotalItems() {
  return assignment.categories.reduce((sum, category) => sum + category.items.length, 0);
}

module.exports = {
  assignment,
  getTotalItems
};
