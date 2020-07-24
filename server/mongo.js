//const dbConf = require('config').mongodb
const Mongoose = require('mongoose')

Mongoose.Promise = Promise
Mongoose.connect('mongodb://127.0.0.1:27017/loveFootPrint', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
Mongoose.connection.on('error', console.error.bind(console, '连接数据库失败'))

module.exports = Mongoose