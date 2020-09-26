const Mongoose = require('mongoose')

const CategoryDetail = require('../models/category_detail')

const ResultCode = require('../utils/result_code')

const ObjectId = Mongoose.Types.ObjectId

// 获取分类数据
async function getCategory(ctx) {
  const query = ctx.query
  const formatData = []
  const cache = {}
  let result = []
  if (query.userId) {
    result = await CategoryDetail.find({
      user: new ObjectId(query.userId)
    }).populate('category').populate('user')
  } else {
    result = await CategoryDetail.find().populate('category').populate('user')
  }
  result.map(item => {
    const { _id, categoryName, key } = item.category
    const obj = {
      id: _id,
      name: categoryName,
      key: key,
      categoryDetail: []
    }
    if (!cache[_id]) {
      cache[_id] = 1
      obj.categoryDetail.push(item)
      formatData.push(obj)
    } else {
      for (let i = 0, len = formatData.length; i < len; i++) {
        const ele = formatData[i]
        if (ele.id === _id) {
          ele.categoryDetail.push(item)
          break
        }
      }
    }
  })
  ctx.body = ResultCode.success({
    data: formatData
  })
}

module.exports = {
  getCategory
}