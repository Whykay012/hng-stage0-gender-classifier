
const globalErrorHandler = (err, req, res, next) => {
  // Log the full error to your server console for debugging
  console.error(`[Error Log - ${new Date().toISOString()}]: ${err.stack || err.message}`);


  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "An internal server error occurred"
  });
};

module.exports = globalErrorHandler;