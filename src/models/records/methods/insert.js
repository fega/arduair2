const isObject = require('lodash').isObject;
const toDate = require('../util/to-date');

module.exports = async function (registry, device, date) {
  let result;
  registry.device = device;

  /**
   * Response variables
   */
  let errors;
  let code = 201;
  let status = 'success';
  let message = 'Registry created';

  /**
   * Check date
   */
  const checkDate = toDate(date);
  if (isObject(date)) {
    errors = { params: checkDate };
    code = 400;
    message = 'Invalid date parameters';
    status = 'error';
  } else {
    registry.date = checkDate;
  }

  /**
   * Create registry
   */
  try {
    result = this.create(registry);
  } catch (e) {
    errors = e;
    code = 500;
    message = 'Error saving the registry';
    status = 'error';
    return { errors, code, message, status };
  }
  return { code, message, status, data: { registry: result } };
};
