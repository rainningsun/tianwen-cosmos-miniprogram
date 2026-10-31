const lectures = [];

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
