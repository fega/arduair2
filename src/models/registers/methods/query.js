module.exports = async function (device) {
  let registers;
  const sort = { date: -1 };
  const limit = 1000;

  /**
   * Response variables
   */
  let errors;
  let code = 200;
  let status = 'success';
  let message = 'registers retrieved';

  /**
   * get registry list
   */
  try {
    registers = await this.find(device).sort(sort).limit(limit);
  } catch (e) {
    errors = e;
    code = 500;
    message = 'Error Querying the Database';
    status = 'error';
    return { errors, code, message, status };
  }

  return { code, status, message, data: { registers } };
};
