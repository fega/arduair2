function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message || 'Validation error';
  this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'resource not found';
  this.stack = (new Error()).stack;
}
NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = {
  ValidationError,
  NotFoundError,
  error(code, message, details) {
    const err = new Error(message);
    err.status = code;
    err.details = details;
    throw err;
  },
  asyncController(asyncFn) {
    return (req, res, next) =>
    Promise.resolve(asyncFn(req, res, next)).catch(next);
  },

};
