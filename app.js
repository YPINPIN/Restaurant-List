// Express
const express = require('express')
const app = express()
// 設定Server Port
const port = 3000

// 處理request & response
app.get('/', (req, res) => {
  res.send(`<h1>This is restaurant list</h1>`)
})

// 啟動&監聽 Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
