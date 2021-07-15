// Express
const express = require('express')
// express-handlebars
const exphbs = require('express-handlebars')
// method-override
const methodOverride = require('method-override')
// 引用路由器，會自動抓取index
const routes = require('./routes')
// 設定Server Port
const port = 3000
// mongoose
require('./config/mongoose')

const app = express()

// 設定template engine
app.engine(
  'hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./tools/handlebarsHelpers'),
  })
)
app.set('view engine', 'hbs')
// body-parser
app.use(express.urlencoded({ extended: true }))
// 設定 static files
app.use(express.static('public'))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

// 啟動&監聽 Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
