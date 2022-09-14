import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from './routes/index';
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(router);
app.use(handleErrorMiddleware);

export default app;