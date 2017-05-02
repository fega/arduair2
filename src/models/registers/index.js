var mongoose = require('mongoose')
mongoose.Promise = Promise
var RegisterSchema = require('./schema')
/**
 * Device database model
 */
module.exports = mongoose.model('register', RegisterSchema)
