class AppError extends Error {
  constructor(statusCode, message, success, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific Error Classes
class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(404, message, false);
  }
}

class ValidationError extends AppError {
  constructor(message = 'Validation Error') {
    super(400, message, false);
  }
}

class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(409, message, false);
  }
}

class SuccessError extends AppError {
  constructor(data = null, message = 'Success') {
    super(200, message, true, data);
  }
}

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.message,
      code: err.statusCode,
      success: err.success,
      data: err.data,
    });
  } else {
    res.status(500).json({
      status: 'Internal Server Error',
      code: 500,
      success: false,
    });
  }
};

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  ConflictError,
  SuccessError,
  errorHandler
};
