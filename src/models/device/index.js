const mongoose = require('mongoose')
mongoose.Promise = Promise
let deviceSchema = require('./schema')

deviceSchema.statics.query = function () {
  let self = this
  return function (req, res) {
    self.find({}, ['device', 'owner', 'description'])
    .then(devices => res.json({data: {devices}, status: 'success'}))
    .catch(err => {
      console.log(err)
      res.status(500).json({'message': 'database query error', status: 'error'})
    })
  }
}

deviceSchema.statics.detail = function () {
  let self = this
  return (req, res) => {
    const device = req.params.device
    self.findOne({device}, {pasword: 0})
    .then(device => {
      if (!device) res.status(404).json({message: 'Device not found', status: 'error'})
      else res.json({data: {device}, status: 'success'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({'message': 'Database query error', status: 'error'})
    })
  }
}

deviceSchema.statics.insert = function () {
  let self = this
  return (req, res) => {
    var device = req.body.device
    var deviceBody = req.body
    self.findOne({device})
    .then(device => {
      if (device) res.status('409').json({'message': 'Device name already exist', status: 'error'})
      else {
        self.create(deviceBody)
        .then(result => res.status(201).json({status: 'success', data: {device: result}}))
        .catch(err => {
          console.log(err)
          res.status(500).json({'message': 'database save error', status: 'error'})
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({'message': 'database query error', status: 'error'})
    })
  }
}

deviceSchema.statics.query = function () {
  let self = this
  return function (req, res) {
    self.find({}, ['device', 'owner', 'description'])
    .then(devices => res.json({data: {devices}, status: 'success'}))
    .catch(err => {
      console.log(err)
      res.status(500).json({'message': 'database query error', status: 'error'})
    })
  }
}

/**
 * Device database model
 */
module.exports = mongoose.model('device', deviceSchema)
