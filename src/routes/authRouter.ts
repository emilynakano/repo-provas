import { Router } from 'express';

import * as authController from '../controllers/authController';
import schemaMiddleware from '../middlewares/schemaMiddleware';
import { createUserSchema } from '../schemas/authSchema';

const authRouter = Router();

authRouter.post('/sign-up', 
    schemaMiddleware(createUserSchema),
    authController.createUser
);
authRouter.post('/sign-in', 
    authController.loginUser
);

export default authRouter;