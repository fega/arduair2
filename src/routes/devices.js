const express = require('express');

const router = express.Router();
const notImplemented = require('../middleware/not-implemented');
const Device = require('../controllers/devices');

/* GET all devices */
router.get('/', Device.query);

/* GET one device */
router.get('/:device', Device.detail);

/* POST devices */
router.post('/', Device.insert);

/* Update device */
router.patch('/:device', Device.update);

/* DELETE device */
router.delete('/:device', Device.remove);

/* PUT device */
router.put('/', notImplemented);

module.exports = router;
