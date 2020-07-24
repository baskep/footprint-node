/**
 * TRACE - ‘blue’
 * DEBUG - ‘cyan’
 * INFO - ‘green’
 * WARN - ‘yellow’
 * ERROR - ‘red’
 * FATAL - ‘magenta’
 */

const log4js = require('log4js')

log4js.configure({
  appenders: {
    out: {
      type: 'dateFile',
      filename: 'logs/out.log',
      pattern: '.yyyy-MM-dd',
      daysToKeep: 14,
      pm2: true,
      layout: {
        type: 'pattern',
        pattern: '%d+0800 %m%n',
      }
    },
    path: {
      type: 'dateFile',
      filename: 'logs/path.log',
      pattern: '.yyyy-MM-dd',
      daysToKeep: 14,
      pm2: true,
      layout: {
        type: 'pattern',
        pattern: '%d+0800 %m%n',
      }
    },
    error: {
      type: 'dateFile',
      filename: 'logs/error.log',
      pattern: '.yyyy-MM-dd',
      daysToKeep: 14,
      pm2: true,
      layout: {
        type: 'pattern',
        pattern: '%d+0800 %m%n',
      }
    },
    slientError: {
      type: 'dateFile',
      filename: 'logs/slientError.log',
      pattern: '.yyyy-MM-dd',
      daysToKeep: 14,
      pm2: true,
      layout: {
        type: 'pattern',
        pattern: '%d+0800 %m%n',
      }
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' },
    error: { appenders: ['error'], level: 'error' },
    slientError: { appenders: ['slientError'], level: 'error' },
    out: { appenders: ['out'], level: 'info' },
    path: { appenders: ['path'], level: 'info' },
  }
})

//  错误日志打印到控制台和文件
const ErrorLog = log4js.getLogger('error')

//  错误日志打印到文件 不打印到控制台
const SlientErrorLog = log4js.getLogger('slientError')

// 信息日志打印到控制台和文件
const OutLog = log4js.getLogger('out')

// 请求日志打印到文件 不打印到控制台
const PathLog = log4js.getLogger('path')

// 普通日志记录
function log(ctx, err, exObj) {
  let log = `普通日志记录`
  if (typeof err === 'string') {
    log += err
  } else if (err instanceof Error) {
    log += `${err.name}:${err.message}`
  } else {
    log += JSON.stringify(err)
  }
  if (exObj) {
    if (typeof exObj === 'string') {
      log += exObj
    } else {
      log += ` ${JSON.stringify(exObj)}`
    }
  }
  OutLog.info(log)
}

// 错误日志记录
function error(ctx, err, exObj) {
  let log = `错误日志记录`
  if (typeof err === 'string') {
    log += err
  } else if (err instanceof Error) {
    log += `${err.name}:${err.message}`
  } else {
    log += JSON.stringify(err)
  }
  if (exObj) {
    if (typeof exObj === 'string') {
      log += exObj
    } else {
      log += ` ${JSON.stringify(exObj)}`
    }
  }
  ErrorLog.error(log)
}

// 暂时没有用
function silentError(...args) {
  SlientErrorLog.error(...args)
}

// 路径记录
function recordPath(ctx, elapsed) {
  const thread = elapsed === -1 ? '开始' : '结束'
  let statusCode = 0
  if (ctx.body) {
    const status = ctx.body.status
    if (status && status.code) {
      statusCode = status.code
    }
  }
  console.log('ctx信息')
  console.log(ctx)
  // const log = `${config.appName} ${ctx.requestId || null} null ${thread} info ${ctx.groupId || null} ${ctx.corpid || null} ${ctx.userid || null} ${ctx.ip || null} ${ctx.path || null} ${elapsed} ${statusCode} ${ctx.visitorId || null} ${ctx.querystring || null} ${ctx.headers['user-agent']}`
  // console.log('路径记录')
  
  PathLog.info(log)
}

module.exports = {
  log,
  error,
  recordPath,
  silentError
}
