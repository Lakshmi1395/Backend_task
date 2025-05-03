const ApiResponse = require('./api-response');

const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      const data = await fn(req, res, next);
      if (!res.headersSent) {
        res.status(200).json(ApiResponse.success(data));
      }
    } catch (error) {
      if (!res.headersSent) {
        const statusCode = error.status || error.statusCode || 500;
        const message = error.message || 'Something went wrong';

        res.status(statusCode).json(ApiResponse.fail(message));
      }
    }
  };
};

module.exports = asyncHandler;
