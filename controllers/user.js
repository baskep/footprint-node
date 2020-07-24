const User = require('../models/user')
const ResultCode = require('../utils/result_code')

async function test(ctx) {
  const user = new User({
    userName: 'test1',
    password: 't1',
  })
  // await user.save((err, result) => {
  // })
  ctx.body = 'test'
}

async function login(ctx) {
  
}

module.exports = {
  test
}