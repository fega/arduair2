var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')
var Device = require('../controllers/devices')

/* GET all devices */
router.get('/', Device.query)

/* GET one device */
router.get('/:device', Device.detail)

/* POST devices */
router.post('/', Device.insert)

/* Update device */
router.patch('/:device', Device.update)

/* DELETE device */
router.delete('/:device', Device.remove)

/* PUT device */
router.put('/', notImplemented)

module.exports = router
