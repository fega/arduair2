const express = require('express');

const router = express.Router();
const notImplemented = require('../middleware/not-implemented');

/* Disable route */

/* GET all registers */
router.get('/:deviceId/records', notImplemented);

/* GET one register */
router.get('/:deviceId/records/:id', notImplemented);

/* POST registers */
router.post('/:deviceId/records', notImplemented);

/* POST registers */
router.post('/:deviceId/postrecord', notImplemented);

/* Update register */
router.put('/:deviceId/records/:id', notImplemented);

/* DELETE register */
router.delete('/:deviceId/records/:id', notImplemented);

module.exports = router;
