module.exports = async function (query = {}, options = undefined) {
  let devices
  let retrieve = ['device', 'owner', 'description']
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
    devices = await this.find(query, retrieve, options)
  } catch (e) {
    errors = e
    code = 500
    message = 'Error Querying the Database'
    status = 'error'
    return {errors, code, message, status}
  }

  return {code, status, message, data: {devices}}
}
