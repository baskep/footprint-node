const InvitationCode = require('../models/invitation_code')
const md5 = require('md5')

// 生成邀请码
async function generateInvitationCode(ctx) {
  for (let i = 0; i < 100; i++) {
    const invitationCode = new InvitationCode({
      code: md5(new Date().getTime() + 1)
    })
    await invitationCode.save()
  }
  ctx.body = '邀请码'
}

module.exports = {
  generateInvitationCode
}