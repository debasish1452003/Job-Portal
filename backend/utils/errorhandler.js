class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace
    Err.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
