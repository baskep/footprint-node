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

// 获取验证码
async function getVerifyCode(ctx) {
  let str = ''
  for (var i = 0; i < 4; i++) {
    str += String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0));
  }
  ctx.body = ResultCode.success({
    code: str
  })
}

// 登录
// todo 邀请码使用后废弃
async function login(ctx) {
  const { mobile, verifyCode, invitionCode } = ctx.request.body
  const reg = /^1[3-9]\d{9}$/
  const password = ctx.request.headers['authorization'] || ''
  let userInfo = null
  if (!mobile || !verifyCode) {
    ctx.body = ResultCode.BAD_REQUEST
    return
  }
  // 校验
  if (!reg.test(mobile)) {
    ctx.body = ResultCode.internalServerError('错误的手机格式')
  } else if (password.length < 4) {
    ctx.body = ResultCode.internalServerError('密码不得小于4位')
  }
  const userResult = await User.findOne({
    mobile: mobile
  })
  if (userResult) userInfo = userResult.toObject()
  const token = JWT.sign({
    name: mobile
  }, JWT_KEY, {
    expiresIn: 3600 * 24 * 7 // 7天过期
  })

  // expiresIn: 3600 * 24 * 7 // 7天过期

  // 如果当前用户已经注册
  if (userInfo && Object.keys(userInfo).length) {
    let userCompleteDataInfo = null
    const userCompleteData = await User.findOne({
      mobile: mobile,
      password: password
    })
    if (userCompleteData) userCompleteDataInfo = userCompleteData.toObject()

    // 判断密码对不对
    if (userCompleteDataInfo && Object.keys(userCompleteDataInfo).length) {
      await User.updateOne({ mobile: mobile }, { $set: { isLogin: true } })
      ctx.body = ResultCode.success({
        _id: userCompleteDataInfo._id,
        token: token,
        userName: userCompleteDataInfo.userName,
        mobile: mobile,
        avatar: userCompleteDataInfo.avatar
      })
    } else {
      ctx.body = ResultCode.AUTH_FAILED
    }
  } else {
    // 没有输入邀请码
    if (!invitionCode) {
      ctx.body = ResultCode.internalServerError('邀请码为空')
    } else {
      let invitionCodeInfo = null
      const invitionCodeInfoResult = await InvitationCode.findOne({
        code: invitionCode
      })
      if (invitionCodeInfoResult) invitionCodeInfo = invitionCodeInfoResult.toObject()
      // 查询到邀请码
      if (invitionCodeInfo && Object.keys(invitionCodeInfo).length) {
        // 已使用
        if (invitionCode.isUse) {
          ctx.body = ResultCode.internalServerError('邀请码已使用')
        } else {
          const newUser = new User({
            userName: 'user_' + mobile,
            password: password,
            mobile: mobile,
            avatar: ''
          })
          await newUser.save()
          await InvitationCode.updateOne({ code: invitionCode }, { $set: { isUse: true } })
          // 为当前注册用户创建具体分类数据
          const user = await User.find({ mobile: mobile })
          const res = await Category.find({})
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            const category = element
            const arr = CATEGORY_ENUM.categoryDetail[element.key]
            for (let j = 0; j < arr.length; j++) {
              const ele = arr[j];
              const detail = new CategoryDetail({
                category: category,
                user: user[0],
                categoryDetailName: ele,
                imageUrl: '',
                content: '',
                localtion: '',
                dateTime: ''
              })
              await detail.save()
            }
          }
          const saveUserData = await User.findOne({ mobile: mobile })
          const saveUserInfo = saveUserData.toObject()
          if (saveUserInfo && Object.keys(saveUserInfo).length) {
            ctx.body = ResultCode.success({
              _id: saveUserInfo._id,
              token: token,
              userName: 'user_' + mobile,
              mobile: mobile,
              avatar: ''
            })
          } else {
            ctx.body = ResultCode.internalServerError('注册失败')
          }
        }
      } else {
        ctx.body = ResultCode.internalServerError('无效的邀请码')
      }
    }
  }
}

// 注销登录
async function loginOut(ctx) {
  const { mobile } = ctx.request.body
  if (!mobile) {
    ctx.body = ResultCode.internalServerError('无效的手机号')
  } else {
    User.updateOne({ mobile: mobile }, { $set: { isLogin: false } })
    ctx.body = ResultCode.success({
      msg: '注销登录成功'
    })
  }
}

// 修改用户信息
async function editUser(ctx) {
  const { type, id, data } = ctx.request.body
  switch (type) {
    case 'userName':
      await User.updateOne({ _id: id }, { $set: { userName: data } })
      break;
    case 'avatar':
      await User.updateOne({ _id: id }, { $set: { avatar: data } })
      break;
    default:
      break;
  }
  ctx.body = ResultCode.success({
    msg: '更改成功'
  })
}

// 修改用户密码
async function editUserPd(ctx) {
  const { id, oldData, newData } = ctx.request.body
  const userInfo = await User.findOne({ _id: id, password: oldData })
  if (!userInfo) {
    ctx.body = ResultCode.internalServerError('原密码错误')
  } else {
    await User.updateOne({ _id: id }, { $set: { password: newData } })
    ctx.body = ResultCode.success({
      msg: '更改成功'
    })
  }
}

module.exports = {
  test,
  login,
  loginOut,
  getVerifyCode,
  editUser,
  editUserPd
}