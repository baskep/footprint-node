const CategoryDetail = require('../models/category_detail')

const ResultCode = require('../utils/result_code')

async function getCategory(ctx) {
  const formatData = []
  const cache = {}
  const result = await CategoryDetail.find().populate('category').populate('user')
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
  ctx.body = {
    data: formatData,
    status: 200
  }
}

module.exports = {
  getCategory
}