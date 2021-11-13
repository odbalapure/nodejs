class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  console.log("CUSTOM ERROR HANDLER CALLED...");
  return new CustomAPIError(msg, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
