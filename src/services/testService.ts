import { Test } from '@prisma/client';

type CreateTest = Omit<Test, "id">

export async function createTest(dataTest:CreateTest) {
    
}