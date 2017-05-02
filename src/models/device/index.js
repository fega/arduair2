const mongoose = require('mongoose')
mongoose.Promise = Promise
let deviceSchema = require('./schema')

deviceSchema.statics = {
  insert: require('./methods/insert'),
  query: require('./methods/query'),
  detail: require('./methods/detail'),
  remove: require('./methods/remove')
}

/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema)
