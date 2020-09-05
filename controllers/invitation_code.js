const invitationCode = require('../models/invitation_code')
const md5 = require('md5')

// 生成邀请码
async function generateInvitationCode(ctx) {
  console.log(md5(new Date().getTime() + 1))
  ctx.body = '邀请码'
}

module.exports = {
  generateInvitationCode
}