const mongoose = require('mongoose');

mongoose.Promise = Promise;
const RegisterSchema = require('./schema');
/**
 * Device database model
 */
module.exports = mongoose.model('register', RegisterSchema);
