var express = require('express')
var router = express.Router()
var notImplemented = require('../middleware/not-implemented')

/* GET home page. */
router.get('/', notImplemented)

module.exports = router
