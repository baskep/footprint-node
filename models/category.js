const Mongoose = require('mongoose')
const categorySchema = require('../schema/category') 

const category = Mongoose.model('category', categorySchema)

module.exports = category