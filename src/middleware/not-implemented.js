module.exports = (req, res) => res
  .status(501)
  .json({ status: 'fail', message: 'Not implemented' });
