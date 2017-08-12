const mongoose = require('mongoose');
const deviceSchema = require('./schema');

mongoose.Promise = Promise;
const statics = deviceSchema.statics;
/**
 * Schema Statics
 */

statics.query = require('./methods/query');
statics.insert = require('./methods/insert');
statics.detail = require('./methods/detail');
statics.remove = require('./methods/remove');
statics.update = require('./methods/update');

/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema);
