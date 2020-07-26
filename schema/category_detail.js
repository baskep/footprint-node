const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const categoryDetailSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  imageUrl: String,
  categoryDetailName: String,
  content: String,
  localtion: String,
  dateTime: String
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

module.exports = categoryDetailSchema