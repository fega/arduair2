const mongoose = require('mongoose');
const deviceSchema = require('./schema');
const { NotFoundError, ValidationError } = require('../../util');

mongoose.Promise = Promise;
const statics = deviceSchema.statics;
/**
 * Schema Statics
 */

statics.update = function update(query, data) {
  return this.findOneAndUpdate({ ...query, removed: false }, { $set: data }, { new: true });
};
statics.remove = async function remove(query) {
  return this.findOneAndRemove(query);
};
statics.details = function details(query, options) {
  const retrieve = ['-password'];
  return this.findOne({ ...query, removed: false }, retrieve, options);
};
statics.query = async function quer(query = {}, options = undefined) {
  const retrieve = ['device', 'owner', 'description'];
  const sort = { updatedAt: -1 };

  // get device list
  const devices = await this.find({ ...query, removed: false }, retrieve, options).sort(sort);
  return devices;
};
statics.exist = async function exist(query) {
  return (await this.count({ ...query, removed: false }) > 0);
};
statics.timezone = async function tz(query) {
  const retrieve = ['-id', 'timezone'];
  const { timezone } = this.findOne({ ...query, removed: false }, retrieve);
  return timezone;
};
statics.validatePassword = async function validate(name, password) {
  if (!password) throw new ValidationError('no password provided');

  const device = await this.findOne({ device: name, removed: false }, ['password']);
  if (!device) throw new NotFoundError('Device not found');
  console.log('passss MATTCH', device.password, password);
  if (device.password !== password) throw new ValidationError('no matching device/password');

  return Promise.resolve();
};
/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema);
