const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  /* NOTE: Return a generic error incase object of CustomAPIErrro was not passed */
  return res.status(500).json({msg: "Something went wrong, try again later!"});
  // return res.status(err.status).json({ msg: err.message });
};

module.exports = errorHandler;
