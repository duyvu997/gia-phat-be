const errorHandler = (err, req, res, next) => {
  console.log(err);

  let customError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Something went wrong, Please try later!",
  };
  // TODO:  add more detail in customError

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandler;
