const sortData = {
  normal: {
    value: 'normal',
    title: '無',
    sort: {},
  },
  nameAsc: {
    value: 'nameAsc',
    title: 'A → Z',
    sort: { name: 'asc' },
  },
  nameDesc: {
    value: 'nameDesc',
    title: 'Z → A',
    sort: { name: 'desc' },
  },
  ratingDesc: {
    value: 'ratingDesc',
    title: '評分(高 → 低)',
    sort: { rating: 'desc' },
  },
  ratingAsc: {
    value: 'ratingAsc',
    title: '評分(低 → 高)',
    sort: { rating: 'asc' },
  },
  category: {
    value: 'category',
    title: '分類',
    sort: { category: 'asc' },
  },
}

module.exports = { sortData }
