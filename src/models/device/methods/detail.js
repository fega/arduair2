module.exports = async function (query, options) {

  let device
  let retrieve = ['-password']

  /**
   * Response variables
   */
  let errors
  let code = 200
  let status = 'success'
  let message = `Device retrieved`

  /**
   * get device list
   */
  try {
    device = await this.findOne(query, retrieve, options)
  } catch (e) {
    errors = e
    code = 500
    message = 'Error Querying the Database'
    status = 'error'
    return {errors, code, message, status}
  }
  console.log(device)
  if (!device) {
    code = 404
    status = 'fail'
    message = `Device not found`
    return {code, status, message}
  }

  return {code, status, message, data: {device}}
}
