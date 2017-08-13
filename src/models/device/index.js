const mongoose = require('mongoose');
const deviceSchema = require('./schema');

mongoose.Promise = Promise;
const statics = deviceSchema.statics;
/**
 * Schema Statics
 */

statics.update = function update(query, data) {
  return this.findOneAndUpdate(query, { $set: data }, { new: true });
};

statics.remove = async function remove(query) {
  return this.findOneAndRemove(query);
};
statics.details = function details(query, options) {
  const retrieve = ['-password'];

  return this.findOne(query, retrieve, options);
};
statics.query = async function quer(query = {}, options = undefined) {
  const retrieve = ['device', 'owner', 'description'];
  const sort = { updatedAt: -1 };

  // get device list
  const devices = await this.find(query, retrieve, options).sort(sort);
  return devices;
};
statics.exist = async function exist(query) {
  return (await this.count(query) > 0);
};

/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema);
