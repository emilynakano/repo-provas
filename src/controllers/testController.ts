import { Request, Response } from 'express';

import * as testService from '../services/testService'

export async function createTest (
    req: Request, 
    res: Response
) {
    const dataTest = req.body;

    await testService.createTest(dataTest);

    res.status(201).send('Test created sucessfully!')
}

export async function getTestsFromDiscipline (
    req: Request, 
    res: Response
) {
    const tests = await testService.getTestsFromDiscipline()

    res.status(200).send(tests)
}