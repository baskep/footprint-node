const Mongoose = require('mongoose')

const Category = require('../models/category')
const CategoryDetail = require('../models/category_detail')

const ResultCode = require('../utils/result_code')

const ObjectId = Mongoose.Types.ObjectId
const EmptyUserId = '5f1d3bc95a09db0484ddbd49'
const EmptyCategoryId = '5f22efff606088e6aa66764c'

// 获取足迹列表
async function getFootprintList(ctx) {
  const list = []
  const query = ctx.query
  const pageNum = Number(query.pageNum)
  let result = []
  if (query.userId && !query.categoryId) {
    const categories = await Category.find()
    const category = categories[0].toObject()
    result = await CategoryDetail.find({
      user: new ObjectId(query.userId),
      category: category._id
    }).populate('user').skip(pageNum * 5).limit(5)
  } else {
    result = await CategoryDetail.find({
      user: new ObjectId(query.userId || EmptyUserId),
      category: new ObjectId(query.categoryId || EmptyCategoryId)
    }).populate('user').skip(pageNum * 5).limit(5)
  }
  result && result.forEach(u => {
    const obj = u.toObject()
    list.push(obj)
  })
  ctx.body = ResultCode.success({
    data: list
  })
}

// 编辑或发布足迹内容
async function editeCategoryDetail(ctx) {
  const { _id, id, categoryId, content, dateTimeStr, imageUrl, locationStr } = ctx.request.body
  await CategoryDetail.updateOne({
    _id: _id,
    category: categoryId,
    user: id
  }, {
    $set: {
      content: content,
      dateTime: dateTimeStr,
      imageUrl: imageUrl,
      localtion: locationStr
    }
  })

  ctx.body = ResultCode.success({
    data: true
  })
}

module.exports = {
  getFootprintList,
  editeCategoryDetail
}