import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default function (schema: ObjectSchema) {
    return (
        req: Request, 
        res: Response, 
        next: NextFunction
    ) => {
        const { error } = schema.validate(req.body, { abortEarly: false});
        
        if(error) {
            const message: string[] = error.details.map((err: any) => err.message);
            return res.status(422).send(message);
        }

        next();
    }
}