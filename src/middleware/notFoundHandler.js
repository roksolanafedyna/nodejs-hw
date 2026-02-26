import express from 'express';

const app = express();

export const notFoundHandler = app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});
