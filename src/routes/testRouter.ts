import * as testController from '../controllers/testController'

import { Router } from 'express';

const testRouter = Router();

testRouter.post('/tests',
    testController.createTest
)

export default testRouter;