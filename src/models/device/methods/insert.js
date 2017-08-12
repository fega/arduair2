module.exports = async function (query = {}) {
  let device;
  let name;
  let result;
  /**
   * Response variables
   */
  let errors;
  let code = 201;
  let status = 'success';
  let message = `Device ${name} created`;

  /**
   * Missing device parameter
   */
  if (query.device === undefined) {
    code = 400;
    message = '"device" parameter is required';
    status = 'error';
    return { code, message, status };
  }
  name = query.device;
  /**
   * Search a DB
   */
  try {
    device = await this.findOne({ device: name });
  } catch (e) {
    errors = e;
    code = 500;
    message = 'Error Querying the Database';
    status = 'error';
    return { errors, code, message, status };
  }

  /**
   * if device already exist
   */
  if (device) {
    code = 409;
    message = 'Device name already exist';
    status = 'fail';
    return { code, message, status };
  }

  /**
   * Create device
   */
  try {
    result = await this.create(query);
  } catch (e) {
    errors = e.errors;
    code = 400;
    message = 'Error saving the device';
    status = 'error';
    return { errors, code, message, status };
  }
  result.password = '';
  return { code, message, status, data: { device: result } };
};
