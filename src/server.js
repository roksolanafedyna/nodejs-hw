import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});


export const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Мій Додаток" <${process.env.BREVO_USER}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error('Помилка поштового сервісу:', error);
    throw error;
  }
};

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
    app.use(userRouter);
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
