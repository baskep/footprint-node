const Mongoose = require('mongoose')
const categoryDetailSchema = require('../schema/category_detail') 

const categoryDetail = Mongoose.model('categoryDetail', categoryDetailSchema)

module.exports = categoryDetail