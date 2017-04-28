const mongoose = require('mongoose')
mongoose.Promise = Promise
var deviceSchema = require('./schema')
/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema)
