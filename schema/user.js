const Mongoose = require('mongoose')
const Bcrypt = require('bcrypt')

const Schema = Mongoose.Schema
const SALT_WORK_FACTOR = 10

const userSchema = new Schema({
  userName: String,

  password: String,

  mobile: String

}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'modified'
  }
})

userSchema.pre('save', function (next) {
  Bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    Bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

module.exports = userSchema