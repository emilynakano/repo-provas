import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';
import * as errorUtils from '../utils/errorUtils';
import * as authService from '../services/authService'

import dotenv from 'dotenv';

dotenv.config();

export default async function tokenMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
) {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) throw errorUtils.unauthorizedError('token');
    
    try {
        const secretKey = (process.env.JWT_SECRET_KEY as string);
        const { id } = jwt.verify(token, secretKey) as { id: number};
        
        const user = await authService.findUserById(id);
        if(!user) throw errorUtils.notFoundError('user');
        
        res.locals.user = user;

        next()

    } catch(err) {
        throw errorUtils.unauthorizedError('token')
    }

}