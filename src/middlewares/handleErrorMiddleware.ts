import { Request, Response, NextFunction } from 'express';
import { errorTypeToStatusCode, isAppError } from '../utils/errorUtils'

export default function handleErrorMiddleware(
    err: any,
    req:Request, 
    res: Response, 
    next: NextFunction
) {

    if(isAppError(err)) {
        const statusCode = errorTypeToStatusCode(err.type);
        return res.status(statusCode).send(err.message)
    }

    console.log(err);

    res.sendStatus(500);
}