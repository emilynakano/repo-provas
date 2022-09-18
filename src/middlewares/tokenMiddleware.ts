import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '../utils/errorUtils';

dotenv.config();

export default async function tokenMiddleware (
    req: Request,
    res: Response,
    next: NextFunction
) {

    const token = req.headers.authorization?.replace('Bearer ', '');
    if(!token) throw unauthorizedError('token');
    
    try {
        const secretKey = (process.env.JWT_SECRET_KEY as string);
        const { id } = jwt.verify(token, secretKey) as { id: number};
        console.log(id)
    } catch(err) {
        throw unauthorizedError('token')
    }

    next()
}