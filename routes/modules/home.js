// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// restaurant model
const Restaurant = require('../../models/restaurant')
// sortData
const sortHelpers = require('../../tools/sortHelpers')
const sortData = sortHelpers.sortData

// 餐廳列表
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants, sortData }))
    .catch((error) => console.error(error))
})

// 匯出路由器
module.exports = router
