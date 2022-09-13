import express, {json} from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors());
server.use(json());

server.use(router);

const PORT = Number(process.env.PORT);

server.listen(PORT, () => console.log(`server running on port ${PORT}`))