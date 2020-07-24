const Logger = require('../utils/logger.js')
const ResultCode = require('../utils/result_code.js')

async function init(ctx, next) {
  const start = Date.now()
  Logger.recordPath(ctx, -1)
  try {
    await next()
    if (ctx.body === undefined) {
      ctx.body = ResultCode.NOT_FOUND
    }
  } catch (err) {
    // console.error(`url:${ctx.url} requestId: ${ctx.requestId} `, err)
    if (err && err.status && err.status.code && err.status.message) {
      ctx.body = err
    } else {
      ctx.body = ResultCode.internalServerError()
    }
    Logger.error(ctx, err)
  }
  Logger.recordPath(ctx, Date.now() - start)
}

module.exports = {
  init
}
