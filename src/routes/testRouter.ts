import * as testController from '../controllers/testController';

import schemaMiddleware from '../middlewares/schemaMiddleware';
import testSchema from '../schemas/testSchema';

import { Router } from 'express';

const testRouter = Router();

testRouter.post('/tests',
    schemaMiddleware(testSchema),
    testController.createTest
)

export default testRouter;