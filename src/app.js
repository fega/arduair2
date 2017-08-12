const path = require('path');
const logger = require('morgan');
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const compression = require('compression');
const error404 = require('./middleware/error404');
const errorHandler = require('./middleware/error-handler');

const index = require('./routes/index');
const records = require('./routes/records');
const devices = require('./routes/devices');
const configFiles = require('./routes/config-files');

const app = express();
mongoose.connect(config.get('mongodb.uri'));
app.use(compression())
   .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
   .use(logger('dev'))
   .use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(express.static(path.join(__dirname, 'public')))
   .use('/', index)
   .use('/devices', records)
   .use('/devices', devices)
   .use('/config-files', configFiles)
   .use(error404)
   .use(errorHandler);

module.exports = app;
