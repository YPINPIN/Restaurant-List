// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000
// express-handlebars
const exphbs = require('express-handlebars')
// mongoose
const mongoose = require('mongoose')
// restaurant model
const Restaurant = require('./models/restaurant')

// 設定連線到 mongoDB
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected')
})

// 設定template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定 static files
app.use(express.static('public'))

// 處理request & response
// 餐廳列表
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

// 餐廳資訊
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
})

// 搜尋餐廳(名稱、分類)
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  Restaurant.find()
    .lean()
    .then((restaurantList) => {
      const restaurants = restaurantList.filter(
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
    .catch((error) => console.error(error))
})

// 啟動&監聽 Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
