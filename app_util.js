const Cors = require('@koa/cors')
const Compress = require('koa-compress')
const BodyParser = require('koa-bodyparser')
const LoggerMiddleware = require('./middleware/logger.js')

function init(app, routes) {
  app
    .use(Cors({
      origin: corsUrlWhitelist,
      maxAge: 86400,
      credentials: true
    }))
    .use(Compress())
    .use(BodyParser({
      enableTypes: ['json', 'form', 'text'],
      extendTypes: {
        text: 'text/xml'
      },
      jsonLimit: "10mb"
    }))
    .use(LoggerMiddleware.init) // 日志采集
    .use(routes)
}

// 跨域白名单
function corsUrlWhitelist(ctx) {
  //   if (config.urlWhiteList.some(url => ctx.url.includes(url))) {
  //     const origin = ctx.get('Origin')
  //     return origin
  //   }
  return 'http://127.0.0.1:3002'
}

module.exports = {
  init
}