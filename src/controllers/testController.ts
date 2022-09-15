import { NextFunction, Request, Response } from 'express';

import * as testService from '../services/testService'

export async function createTest (
    req: Request, 
    res: Response
) {
    const dataTest = req.body;

    await testService.createTest(dataTest);

    res.status(201).send('Test created sucessfully!')
}

export async function getTestsByTeacher (
    req: Request, 
    res: Response
) {
    const dataTest = req.body;

    const tests = await testService.getTestsByTeacher()

    res.status(200).send(tests)
}