const express = require('express');

const router = express.Router();
const notImplemented = require('../middleware/not-implemented');

/* GET home page. */
router.get('/', (req, res) => {
  res.send('index.html');
});

module.exports = router;
