import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRouter from './routes/notesRoutes.js';
import { Note } from './models/note.js';

dotenv.config();

const startServer = async () => {
  try {
    await connectMongoDB();
    const count = await Note.countDocuments();
    console.log(`У базі знайдено нотаток: ${count}`);
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(logger);
    app.use(cors());
    app.use(express.json());
    app.use(notesRouter);
    app.use(notFoundHandler);
    app.use(errorHandler);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start the server:', error);
  }
};
startServer();
