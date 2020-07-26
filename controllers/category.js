const Category = require('../models/category')
const CategoryDetail = require('../models/category_detail')

const ResultCode = require('../utils/result_code')

async function getCategory(ctx) {
  let res = []
  let category = await CategoryDetail.find().populate('category')
  ctx.body = {
    data: category,
    status: 200
  }
}

module.exports = {
  getCategory
}