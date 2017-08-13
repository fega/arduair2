const _ = require('lodash');
const express = require('express');
const Device = require('../models/device');
const notImplemented = require('../middleware/not-implemented');

const router = express.Router();

const asyncController = asyncFn => (req, res, next) =>
  Promise.resolve(asyncFn(req, res, next)).catch(next);
const get = _.get;
const error = (code, message, details) => {
  const err = new Error(message);
  err.status = code;
  err.details = details;
  throw err;
};

/* GET all devices */
router.get('/', (req, res) => {
  Device.query()
  .then(devices => res.status(200).json({
    code: 200,
    status: 'success',
    message: 'Devices retrieved',
    data: {
      devices,
    },
  }));
});

/* GET one device */
router.get('/:device', asyncController(async (req, res) => {
  const device = get(req, 'params.device');
  const deviceDetails = await Device.details({ device });

  if (!deviceDetails) {
    error(404, 'device not found', { device });
  } else {
    res.status(200).json({
      status: 'success',
      message: 'Device found',
      data: {
        device: deviceDetails,
      },
    });
  }
}));

/* POST devices */
router.post('/', asyncController(async (req, res) => {
  const newDevice = req.body;
  const { device } = newDevice;

  if (await Device.exist({ device })) error(409, 'Device already exist');

  const storedDevice = await Device.create(newDevice);

  res.status(200).json({
    status: 'success',
    message: 'Device created',
    data: {
      device: storedDevice,
    },
  });
}));

/* Update device */
router.patch('/:device', asyncController(async (req, res) => {
  const device = req.params.device;
  const body = req.body;

  const updated = await Device.update(device, body);

  res.json({
    status: 'success',
    message: 'device Updated',
    data: {
      device: updated,
    },
  });
}));

/* DELETE device */
router.delete('/:device', asyncController(async (req, res) => {
  const device = get(req, 'params.device');
  if (await Device.exist({ device })) {
    await Device.remove({ device });
    res.status(204).send();
  } else {
    error(404, 'Device not found');
  }
}));

/* PUT device */
router.put('/', notImplemented);

module.exports = router;
