// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// restaurant model
const Restaurant = require('../../models/restaurant')

// 餐廳列表
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

// 匯出路由器
module.exports = router
