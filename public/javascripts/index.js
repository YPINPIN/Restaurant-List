const searchForm = document.querySelector('#searchForm')
const sortBy = document.querySelector('#sortBy')

sortBy.addEventListener('change', () => searchForm.submit())
