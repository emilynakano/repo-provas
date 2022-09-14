import { NextFunction, Request, Response } from 'express';

import * as authService from '../services/authService'

export async function createUser (
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const { email, password } = req.body;

    await authService.createUser({ email, password });

    res.status(201).send('user registred sucessfully');
}

export async function loginUser (
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const { email, password } = req.body;

    const token = await authService.loginUser({ email, password });

    res.status(200).send({token});
}