module.exports = async function (query, options = undefined) {
  let device
  let retrieve = ['-pasword']
  let sort = {updatedAt: -1}
  /**
   * Response variables
   */
  let errors
  let code = 200
  let status = 'success'
  let message = `Devices retrieved`

  /**
   * get device list
   */
  try {
    device = await this.find(query, retrieve, options).sort(sort)
  } catch (e) {
    errors = e
    code = 500
    message = 'Error Querying the Database'
    status = 'error'
    return {errors, code, message, status}
  }

  if (!device) {
    code = 404
    status = 'fail'
    message = `Device ${query} not found`
    return {code, status, message}
  }

  return {code, status, message, data: {device}}
}
