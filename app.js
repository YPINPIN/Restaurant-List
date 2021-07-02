// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000
// express-handlebars
const exphbs = require('express-handlebars')

// 設定template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 處理request & response
app.get('/', (req, res) => {
  res.render('index')
})

// 啟動&監聽 Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
