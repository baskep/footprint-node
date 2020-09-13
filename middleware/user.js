const JWT = require('jsonwebtoken')
const ResultCode = require('../utils/result_code.js')

const JWT_KEY = 'footprint'

// token验证
async function verify(ctx, next) {
  const token = ctx.request.headers['authorization'] || ''
  const result = JWT.verify(token, JWT_KEY, (err, decode) => {
    return new Promise((resolve, reject) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
  if (result) {
    await next()
  } else {
    ctx.body = ResultCode.LOGIN_INVALID
  }
}

module.exports = {
  verify
};
