var compression = require('compression')
var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var errorHandler = require('./middleware/error-handler')
var error404 = require('./middleware/error404')

var index = require('./routes/index')
var registers = require('./routes/registers')
var devices = require('./routes/devices')

var app = express()

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', index)
app.use(error404)
app.use(errorHandler)

module.exports = app
