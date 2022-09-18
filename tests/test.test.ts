import app from '../src/app';
import supertest from 'supertest';

import prisma from "../src/config/database";

import { createToken } from './factories/tokenFactory';
import { generateTest } from './factories/testFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

const agent = supertest(app);

describe("POST /tests", () => {
    it("given a valid data test and a valid token it should answer with status 201 ", async () => {
        const token = await createToken();
        const test = await generateTest();

        const response = await agent.post('/tests').set('Authorization', `Bearer ${token}`).send(test)
        expect(response.status).toBe(201);
    });

});



afterAll(async () => {
    await prisma.$disconnect();
});