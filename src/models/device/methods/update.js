module.exports = async function (device, data) {
  /**
   * Response variables
   */
  let errors;
  let code = 200;
  let status = 'success';
  let message = `Device ${device} updated`;

  /**
   * get device list
   */
  try {
    device = await this.findOneAndUpdate({ device }, { $set: data }, { new: true });
  } catch (e) {
    errors = e.errors;
    code = 400;
    message = 'Error Updating the Database';
    status = 'error';
    return { errors, code, message, status };
  }

  return { code, status, message, data: { device } };
};
