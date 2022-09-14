import { Router } from 'express';

import * as authController from '../controllers/authController'

const authRouter = Router();

authRouter.post('/sign-up', 
    authController.createUser
);
authRouter.post('/sign-in', 
    authController.loginUser
);

export default authRouter;