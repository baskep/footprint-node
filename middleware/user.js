const JWT = require('jsonwebtoken');
const ResultCode = require('../utils/result_code.js');

const FORM_KEY = 'x-request-token';
const FORM_SEC = ''; // 用于form token 加密的密钥

async function verify(ctx, next) {
  await next()
  // if (ctx.formUserId && ctx.corpid) {
  //   const corpInfo = await CorpInfo.findOne({ corpId: ctx.corpid });
  //   if (corpInfo) {
  //     ctx.corpInfo = corpInfo;
  //     const UserInfoModel = corpInfo.getUserTable();
  //     const user = await UserInfoModel.findOne({ formUserId: ctx.formUserId, corpId: ctx.corpid });
  //     if (user) {
  //       ctx.user = user;
  //       ctx.userid = user._id;
  //     }
  //   }
  // }
  // if (ctx.user) {
  //   await next();
  // } else {
  //   ctx.body = ResultCode.NOT_LOGIN;
  // }
}

module.exports = {
  verify
};
