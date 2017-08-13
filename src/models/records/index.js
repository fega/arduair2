const mongoose = require('mongoose');

mongoose.Promise = Promise;
const recordSchema = require('./schema');

const statics = recordSchema.statics;

/**
 * Device database model
 */
module.exports = mongoose.model('record', recordSchema);
