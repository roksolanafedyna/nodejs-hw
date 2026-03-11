import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const startServer = async () => {
  try {
    await connectMongoDB();
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(logger);
    app.use(cors({
  origin: true,
  credentials: true,
}));
    app.use(cookieParser());
    app.use(express.json());
    app.use(authRouter);
    app.use(notesRouter);
    app.use(notFoundHandler);
    app.use(errors());
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};
startServer();
