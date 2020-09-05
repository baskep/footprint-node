const JWT = require('jsonwebtoken')
const ResultCode = require('../utils/result_code.js')

const JWT_KEY = 'footprint'

// token验证
async function verify(ctx, next) {
  const token = ctx.request.headers['authorization'] || ''
  JWT.verify(token, JWT_KEY, (err, decode) => {
    if (err) {
      ctx.body = ResultCode.LOGIN_INVALID
    }
  })
  await next()
}

module.exports = {
  verify
};
