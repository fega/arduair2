/**
 * Check if the params day, month,
 * year, hour and minute are okay in range. if all is okay return true
 * else it return an error message.
 * @param  {Number} day    day
 * @param  {Number} month  month
 * @param  {Number} year   year
 * @param  {Number} hour   hour
 * @param  {Number} minute minute
 * @param  {Number} second second
 * @return {String|true}
 */
module.exports = (day, month, year, hour, minute, second) => {
  let message = ''
  message += checkRange(day, 31, 0, 'day')
  message += checkRange(month, 12, 0, 'month')
  message += checkRange(year, 10000, 2000, 'year')
  message += checkRange(hour, 24, 0, 'hour')
  message += checkRange(minute, 60, 0, 'minute')
  if (isEmpty(message)) {
    return true
  } else {
    return message
  }
}
/**
 * Check if the value provide is beetween min and max, if not.
 * returns and String with the error
 * @param  {Int} val  Value to be evaluated
 * @param  {Int} min  min value range
 * @param  {Int} max  Max value range
 * @param  {String} name String to build the error message
 * @return {String}
 * @private
 */
function checkRange (val, min, max, name) {
  if (!val || val > max || val < min || isNaN(val)) {
    return `Problems with ${name}, <br>`
  } else {
    return ''
  }
}
/**
 * Check if str is empty
 * @param  {String}  str String to check
 * @return {Boolean}
 * @private
 */
function isEmpty (str) {
  return (!str || str.length === 0)
}
