require('./server/mongo')

const Koa = require('koa')
const AppUtil = require('./app_util')
const Routes = require('./routers')

const app = new Koa()

AppUtil.init(app, Routes)

app.listen(3002)

console.log('服务启动成功，端口号 : ' + 3002)