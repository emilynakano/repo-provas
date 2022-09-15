import prisma from '../config/database';

import { Test } from '@prisma/client';

export type CreateTest = Omit<Test, "id">

export async function insertTest( dataTest:CreateTest ) {
    await prisma.test.create({
        data: dataTest
    })
}

export async function getTestsByTeacher() {
    
}