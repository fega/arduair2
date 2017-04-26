var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')

/* Disable route */
router.use(notImplemented)

/* GET all registers */
router.get('/', (req, res) => {

})

/* GET one register */
router.get('/:id', (req, res) => {

})

/* POST registers */
router.post('/', (req, res) => {

})

/* Update register */
router.put('/:id', (req, res) => {

})

/* DELETE register */
router.delete('/:id', (req, res) => {

})

module.exports = router
