import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'colors';
import 'express-async-errors';

// DB
import connectDB from './db/connect.js';

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandleMiddleware from './middleware/error-handler.js';

// Routes
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('hi');
});

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`.yellow.bold);
    });
  } catch (error) {
    console.error(`Error:${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

start();
