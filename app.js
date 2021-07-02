// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000
// express-handlebars
const exphbs = require('express-handlebars')
// 載入 restaurant list 資料
const restaurantList = require('./restaurant.json')

// 設定template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定 static files
app.use(express.static('public'))

// 處理request & response
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// 餐廳資訊
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurant = restaurantList.results.find(
    (restaurant) => restaurant.id.toString() === req.params.restaurantId
  )
  res.render('show', { restaurant })
})

// 搜尋餐廳(名稱、分類)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  )
  // 是否無相關餐廳資料
  const searchTip =
    restaurants.length === 0
      ? `<h1 class="text-info text-center">查無餐廳資料</h1>`
      : ''
  res.render('index', { restaurants, keyword, searchTip })
})

// 啟動&監聽 Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
