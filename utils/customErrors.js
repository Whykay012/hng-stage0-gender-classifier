class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnprocessableEntityError extends AppError {
  constructor(message = "Unprocessable Entity") {
    super(message, 422);
  }
}

class UpstreamError extends AppError {
  constructor(message = "External API Failure") {
    super(message, 502);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  UnprocessableEntityError,
  UpstreamError
};