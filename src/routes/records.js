const express = require('express');

const Device = require('../models/device');
const Record = require('../models/records');
const { error, asyncController } = require('../util');

const router = express.Router();
const notImplemented = require('../middleware/not-implemented');

/* Disable route */

/* GET all registers */
router.get('/:device/records', asyncController(async (req, res) => {
  const { query } = req;
  const { device } = req.params;

  if (await !Device.exist({ device })) error(404, 'Device not found');
  const timezone = await Device.timezone({ device }) || 'UTC';

  const records = await Record.search({ device }, { ...query, timezone });
  if (records.length === 0) error(404, 'No records for this device');

  res.status(200).json({
    status: 'success',
    data: { records },
  });
}));


/* POST registers */
router.post('/:device/records', asyncController(async (req, res) => {
  const { device } = req.params;
  const { password } = req.body;

  await Device.validatePassword(device, password);
  const record = await Record.create({ device, ...req.body });

  res.status(200).json({
    status: 'success',
    data: {
      record,
    },
  });
}));

/* not implemented */
router.put('/:deviceId/records/:id', notImplemented);
router.delete('/:deviceId/records/:id', notImplemented);
router.get('/:deviceId/records/:id', notImplemented);

module.exports = router;
