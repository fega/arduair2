module.exports = async function (query) {
  let device
  /**
   * Response variables
   */
  let errors
  let code = 201
  let status = 'success'
  let message = `Device ${query} deleted`

  /**
   * get device list
   */
  try {
    device = await this.find(query)
  } catch (e) {
    errors = e
    code = 500
    message = 'Error Querying the Database'
    status = 'error'
    return {errors, code, message, status}
  }

  if (!device) {
    code = 404
    message = `Device ${query} not found`
    status = 'fail'
    return {code, message, status}
  }
  return {code, status, message, data: {device}}
}