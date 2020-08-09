const JWT = require('jsonwebtoken')
const md5 = require('md5')

const User = require('../models/user')
const Category = require('../models/category')
const CategoryDetail = require('../models/category_detail')
const InvitationCode = require('../models/invitation_code')
const CATEGORY_ENUM = require('../enum/category')

const ResultCode = require('../utils/result_code')
const user = require('../models/user')

const JWT_KEY = 'footprint'


async function test(ctx) {

  // 生成一个用户
  // const userItem = new User({
  //   userName: 'xxx',
  //   password: md5('1234'),
  //   mobile: '18529527452',
  //   avatar: ''
  // })
  // userItem.save()

  // 生成category
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

  // 生成category下具体内容
  // let user = await User.find({})
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


async function login(ctx) {
  const { mobile, verifyCode, invitionCode } = ctx.request.body
  const password = ctx.request.headers['authorization'] || ''
  if (!mobile || !verifyCode) {
    ctx.body = ResultCode.BAD_REQUEST
    return
  }
  const userInfo = await User.findOne({
    mobile: mobile
  })
  const token = JWT.sign({
    name: mobile
  }, secretOrPrivateKey, {
    expiresIn: 3600 * 24 * 7 // 7天过期
  })
  // 如果当前用户已经注册
  if (userInfo && Object.keys(userInfo).length) {
    const userCompleteData = await User.findOne({
      mobile: mobile,
      password: password
    })
    // 判断密码对不对
    if (userCompleteData && Object.keys(userCompleteData).length) {
      await User.updateOne({
        mobile: mobile
      }, {
        isLogin: true
      })
      ctx.body = ResultCode.success({ token: token })
    } else {
      ctx.body = ResultCode.AUTH_FAILED
    }
  } else {
    // 没有输入邀请码
    if (!invitionCode) {
      ctx.body = ResultCode.internalServerError('邀请码为空')
    } else {
      const invitionCodeInfo = InvitationCode.findOne({ code: invitionCode })
      // 查询到邀请码
      if (invitionCodeInfo && Object.keys(invitionCodeInfo).length) {
        // 已使用
        if (invitionCode.isUse) {
          ctx.body = ResultCode.internalServerError('验证码已使用')
        } else {
          const newUser = new User({
            userName: mobile,
            password: password,
            mobile: mobile,
            avatar: ''
          })
          await newUser.save()
          await InvitationCode.updateOne({ code: invitionCode }, { isUse: true })
          ctx.body = ResultCode.success({ token: token })
        }
      }
    }
  }
}

module.exports = {
  test,
  login
}