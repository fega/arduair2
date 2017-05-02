var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')
var device = require('../models/device')

/* GET all devices */
router.get('/', device.query())

/* GET one device */
router.get('/:device', notImplemented)

/* POST devices */
router.post('/', device.insert())

/* Update device */
router.put('/:device', notImplemented)

/* DELETE device */
router.delete('/:device', notImplemented)

module.exports = router
