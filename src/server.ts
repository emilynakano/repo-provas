import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';

import router from './routes/index';
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';

import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.use(router);
server.use(handleErrorMiddleware);

const PORT = Number(process.env.PORT);

server.listen(PORT, () => console.log(`server running on port ${PORT}`))