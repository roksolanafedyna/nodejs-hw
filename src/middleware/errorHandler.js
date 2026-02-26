import express from 'express';

const app = express();
export const errorHandler = app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});
