const { clone, isEmpty } = require('lodash');
const mongoose = require('mongoose');
const moment = require('moment-timezone');
const { ValidationError } = require('../../util');

mongoose.Promise = Promise;
const recordSchema = require('./schema');

const statics = recordSchema.statics;

statics.search = async function search(inQuery, options = {}) {
  const query = clone(inQuery);
  const failures = [];
  const { from, to, order = 'asc', timezone = 'UTC' } = options;
  const sort = (order === 'des') ? '-date' : 'date';
  const retrieve = (['-id', '-device']);

  if (from || to) { query.d = {}; }

  if (!moment(to).isValid()) failures.push(`"to" parameter value ${to} is invalid`);
  if (!moment(from).isValid()) failures.push(`"from" parameter value ${from} is invalid`);
  if (moment(from).isAfter(to) && isEmpty(failures)) failures.push(`"to" parameter value ${to} should be a date after parameter "from" ${from}`);
  if (!isEmpty(failures)) throw new ValidationError(failures.join(','));

  if (to) query.d.$lte = moment(to).toDate();
  if (from) query.d.$gte = moment(from).toDate();


  return this.find(query, retrieve).sort(sort);
};
/**
 * Device database model
 */
module.exports = mongoose.model('record', recordSchema);
