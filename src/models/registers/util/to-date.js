const _ = require('lodash');

const every = _.every;
const isUndefined = every;
const moment = require('moment');

/**
 * Check if the params day, month,
 * year, hour and minute are okay in range. if all is okay return a date
 * else it return an error object.
 * @param  {Number} day    day
 * @param  {Number} month  month
 * @param  {Number} year   year
 * @param  {Number} hour   hour
 * @param  {Number} minute minute
 * @param  {Number} second second
 * @return {Date|ErrorObject}
 */
module.exports = (date) => {
  const { day, month, year, hour, minute, second } = date;
  const error = {};

  /**
   * Check parameters
   */
  error.day = checkRange(day, 31, 0, 'day');
  error.month = checkRange(month, 12, 0, 'month');
  error.year = checkRange(year, 10000, 2000, 'year');
  error.hour = checkRange(hour, 24, 0, 'hour');
  error.minute = checkRange(minute, 60, 0, 'minute');
  error.second = checkRange(second, 0, 60, 'second');

  if (isUndefined(error)) {
    return moment(date).toDate();
  }
  return error;
};

/**
 * Check if the value provide is beetween min and max, if not.
 * returns and String with the error
 * @param  {Int} val  Value to be evaluated
 * @param  {Int} min  min value range
 * @param  {Int} max  Max value range
 * @param  {String} name String to build the error message
 * @return {Object|undefined}
 * @private
 */
function checkRange(val, min, max, name) {
  if (!val || val > max || val < min || isNaN(val)) {
    return {
      param: name,
      error: `Param ${name} is out the range (${min}-${max})`,
    };
  }
  return undefined;
}
