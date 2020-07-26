const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const categorySchema = new Schema({
  categoryName: String,
  key: String
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

module.exports = categorySchema