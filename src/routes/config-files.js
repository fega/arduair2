const express = require('express');

const router = express.Router();
const notImplemented = require('../middleware/not-implemented');

/* Disable route */
router.use(notImplemented);

/* GET device config */
router.get('/:device', notImplemented);

/* Update device config */
router.put('/:device', notImplemented);

/* Disable all routes */
router.use(notImplemented);

module.exports = router;
