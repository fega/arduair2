var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')

/* Disable route */
router.use(notImplemented)

/* GET all devices */
router.get('/', (req, res) => {

})

/* GET one device */
router.get('/:device', (req, res) => {

})

/* POST devices */
router.post('/', (req, res) => {

})

/* Update device */
router.put('/:device', (req, res) => {

})

/* DELETE device */
router.delete('/:device', (req, res) => {

})

module.exports = router
