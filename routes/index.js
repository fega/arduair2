var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')

/* Disable route */
router.use(notImplemented)

/* GET home page. */
router.get('/', (req, res, next) => {

})

module.exports = router
