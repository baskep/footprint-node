const Mongoose = require('mongoose')

const CategoryDetail = require('../models/category_detail')
const ResultCode = require('../utils/result_code')

const ObjectId = Mongoose.Types.ObjectId
const EmptyUserId = '5f1d3bc95a09db0484ddbd49'
const EmptyCategoryId = '5f22efff606088e6aa66764c'

// 获取足迹列表
async function getFootprintList(ctx) {
  const list = []
  const query = ctx.query
  const result = await CategoryDetail.find({
    user: new ObjectId(query.userId || EmptyUserId),
    category: new ObjectId(query.categoryId || EmptyCategoryId)
  }).populate('user')
  result && result.forEach(u => {
    const obj = u.toObject()
    list.push(obj)
  })
  ctx.body = ResultCode.success({
    data: list
  })
}

module.exports = {
  getFootprintList
}