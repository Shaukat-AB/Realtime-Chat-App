export const errorMiddleware = (err, req, res, next) => {
  res.status(err?.status || 500).json({
    success: false,
    code: err?.status || 500,
    message: err?.message || 'Internal Server Error',
  });
};
