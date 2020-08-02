const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const invitationCodeSchema = new Schema({
  code: String,
  isUse: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

module.exports = invitationCodeSchema