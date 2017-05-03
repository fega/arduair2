const controller = {}
const Device = require('../../models/device')

/**
 * Device controller  query
 */
controller.query = (req, res, next) => {
  Device.query()
  .then(v => res.status(v.code).json(v))
  .catch(v => res.status(v.code).json(v))
}
/**
 * Device controller insert
 */
controller.insert = (req, res, next) => {
  let query = req.body
  Device.insert(query)
  .then(v => res.status(v.code).json(v))
  .catch(v => res.status(v.code).json(v))
}

/**
 * Device controller detail
 */
controller.detail = (req, res, next) => {
  let query
  if (req.params.hasOwnProperty('device')) {
    query = req.params.device
  } else {
    query = {}
  }

  Device.detail({device: query})
  .then(v => res.status(v.code).json(v))
  .catch(v => res.status(v.code).json(v))
}

/**
 * Device controller remove
 */
controller.remove = (req, res, next) => {
  let device = req.params.device

  Device.remove({device})
  .then(v => res.status(v.code).json(v))
  .catch(v => res.status(v.code).json(v))
}

controller.update = (req, res, next) => {
  let device = req.params.device
  let body = req.body

  Device.update(device, body)
  .then(v => res.status(v.code).json(v))
  .catch(v => res.status(v.code).json(v))
}

module.exports = controller
