module.exports = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === 'ValidationError') {
    res.status(400);
  } else {
    res.status(err.status || 500);
  }
  // render the error page
  res.json({ code: err.status,
    status: 'error',
    message: err.message,
    details: err.details,
  });
};
