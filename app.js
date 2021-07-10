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
// body-parser
app.use(express.urlencoded({ extended: true }))

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

// 新增餐廳資料表單
app.get('/restaurants/new', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const categories = new Set(
        restaurants.map((restaurant) => restaurant.category)
      )
      res.render('new', { categories })
    })
    .catch((error) => console.error(error))
})

app.post('/restaurants', (req, res) => {
  // 從 req.body 拿出表單裡的資料
  const restaurant = req.body
  // 資料庫新增餐廳資料
  Restaurant.create({
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description,
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 餐廳資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.log(error))
})

// 餐廳編輯表單
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => {
      Restaurant.find()
        .lean()
        .then((restaurants) => {
          const categories = new Set(
            restaurants.map((restaurant) => restaurant.category)
          )
          res.render('edit', { restaurant, categories })
        })
        .catch((error) => console.error(error))
    })
    .catch((error) => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  // 從 req.body 拿出表單裡的資料
  const newRestaurant = req.body
  // 資料庫修改餐廳資料
  Restaurant.findById(id)
    .then((restaurant) => {
      restaurant.name = newRestaurant.name
      restaurant.name_en = newRestaurant.name_en
      restaurant.category = newRestaurant.category
      restaurant.image = newRestaurant.image
      restaurant.location = newRestaurant.location
      restaurant.phone = newRestaurant.phone
      restaurant.google_map = newRestaurant.google_map
      restaurant.rating = newRestaurant.rating
      restaurant.description = newRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  // 資料庫刪除餐廳資料
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
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
