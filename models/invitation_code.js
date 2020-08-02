const Mongoose = require('mongoose')
const invitationCodeSchema = require('../schema/invitation_code') 

const invitationCode = Mongoose.model('invitationCode', invitationCodeSchema)

module.exports = invitationCode