const CHINESE_ORDINALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function chineseOrder(order) {
  if (!Number.isInteger(order) || order < 1) return '';
  if (order <= CHINESE_ORDINALS.length) return CHINESE_ORDINALS[order - 1];
  return String(order);
}

function lectureLabel(order) {
  return `第${chineseOrder(order)}讲`;
}

function pageRef(order, page) {
  if (!page) return '';
  return `第 ${order} 讲 · p.${page}`;
}

function formatCount(count) {
  return Number.isFinite(count) ? count : 0;
}

module.exports = {
  chineseOrder,
  lectureLabel,
  pageRef,
  formatCount
};
