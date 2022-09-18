import * as testController from '../controllers/testController';

import schemaMiddleware from '../middlewares/schemaMiddleware';
import tokenMiddleware from '../middlewares/tokenMiddleware';

import testSchema from '../schemas/testSchema';

import { Router } from 'express';

const testRouter = Router();

testRouter.use(tokenMiddleware);

testRouter.post('/tests',
    schemaMiddleware(testSchema),
    testController.createTest
)

testRouter.get('/tests/disciplines',
    testController.getTestsFromDiscipline
)

testRouter.get('/tests/teachers',
    testController.getTestsFromTeacher
)

export default testRouter;