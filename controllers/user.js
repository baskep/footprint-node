const User = require('../models/user')
const Category = require('../models/category')
const CategoryDetail = require('../models/category_detail')
const CATEGORY_ENUM = require('../enum/category')

const ResultCode = require('../utils/result_code')

async function test(ctx) {
  // for (let index = 0; index < CATEGORY_ENUM.category.length; index++) {
  //   const element = CATEGORY_ENUM.category[index]
  //     const category = new Category({
  //       categoryName: element.name,
  //       key: element.key
  //     })
  //     await category.save((err, result) => {
  //       console.log(result)
  //     })
  // }
  // let res1 = await User.find({})
  // let res = await Category.find({})
  // for (let index = 0; index < res.length; index++) {
  //   const element = res[index];
  //   const category = element
  //   const arr = CATEGORY_ENUM.categoryDetail[element.key]
  //   console.log(arr.length)
  //   for (let j = 0; j < arr.length; j++) {
  //     const ele = arr[j];
  //     const detail = new CategoryDetail({
  //       category: category,
  //       user: user[0],
  //       categoryDetailName: ele,
  //       imageUrl: '',
  //       content: '',
  //       localtion: '',
  //       dateTime: ''
  //     })
  //     await detail.save((err, result) => {
  //     })
  //   }
  // }
  ctx.body = 'test'
}

module.exports = {
  test
}