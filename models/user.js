const Mongoose = require('mongoose')
const userSchema = require('../schema/user') 

const user = Mongoose.model('user', userSchema)

module.exports = user