import { NextFunction, Request, Response } from "express";

export async function createUser (
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    res.send('oi')
}

export async function loginUser (
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    
}