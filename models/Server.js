// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import 'colors';
// import 'express-async-errors';

// // DB
// import connectDB from '../db/connectDB.js';

// // Middleware
// import notFoundMiddleware from '../middleware/not-found.js';
// import errorHandleMiddleware from '../middleware/error-handler.js';

// // Routes
// import authRouter from '../routes/authRoutes.js';
// // import jobRouter from '../routes/jobRoutes.js';

// class Server {
//   constructor() {
//     this.app = express();
//     this.port = process.env.PORT || 5000;

//     connectDB(process.env.MONGO_URL);
//   }

//   middleware() {
//     // parse body
//     this.app.use(express.json());

//     // cors
//     this.app.use(cors());

//     // Api endpoint
//     this.app.use('/api/v1/auth', authRouter);
//     // this.app.use('/api/v1/job', jobRouter);

//     if (process.env.NODE_ENV !== 'production') {
//       this.app.use(morgan('dev'));
//     }
//   }

//   execute() {
//     // use middleware
//     this.middleware();

//     this.app.listen(this.port, () => {
//       console.log(`server is running on prot ${this.port}`.yellow.bold);
//     });
//   }
// }

// export default Server;
