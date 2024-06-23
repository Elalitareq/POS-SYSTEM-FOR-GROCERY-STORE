// src/middleware/errorHandler.js
function errorHandler(err, req, res, _next) {
  console.log("testing error handler");
  const statusCode = err.statusCode || 500;
  console.log(err);
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message: err.message,
  });
}

export default errorHandler;
// src/middleware/userPermission.js
