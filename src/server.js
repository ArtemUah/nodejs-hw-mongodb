import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import env from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import authRouter from './routers/auth.js';
import { UPLOAD_DIR } from './constants/index.js';

const port = env('PORT', '3000');

const setupServer = () => {

const app = express();

// app.use(
//   pino({
//     transport: {
//       target: 'pino-pretty',
//     },
//   }),
// );
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(UPLOAD_DIR));


app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);

app.use('*', notFoundHandler);

app.use(errorHandler);

app.listen(port, ()=> console.log(`Server is running in PORT ${port}`));

};

export default setupServer;
