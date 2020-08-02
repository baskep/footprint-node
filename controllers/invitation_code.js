const invitationCode = require('../models/invitation_code')
const md5 = require('md5')

async function generateInvitationCode(ctx) {
  var a = md5(new Date().getTime() + 1)
  console.log(md5(new Date().getTime() + 1))
  ctx.body = '邀请码'
}

module.exports = {
  generateInvitationCode
}