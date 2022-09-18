import app from '../src/app';
import supertest from 'supertest';

import prisma from "../src/config/database";

import { createToken, createWrongToken } from './factories/tokenFactory';
import { generateTest } from './factories/testFactory';

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;
});

const agent = supertest(app);

describe("POST /tests", () => {

    it("given a valid token and a valid data test it should answer with status 201", async () => {
        const token = await createToken();
        const test = await generateTest();

        const response = await agent.post('/tests').set('Authorization', `Bearer ${token}`).send(test)
        expect(response.status).toBe(201);
    });

    it("given a invalid token it should answer with status 401", async () => {
        const wrongToken = await createWrongToken()

        const response = await agent.post('/tests').set('Authorization', `Bearer ${wrongToken}`)
        expect(response.status).toBe(401);
    });

    it("given a valid token and an invalid data test it should answer with status 422", async () => {
        const token = await createToken();
        const test = generateTest()

        const response = await agent.post('/tests').set('Authorization', `Bearer ${token}`).send({...test, name: ''})
        expect(response.status).toBe(422);
    });

});

describe("GET /tests/disciplines", () => {

    it("given a valid token it should answer with status 200", async () => {
        const token = await createToken();
        const test = await generateTest();

        const response = await agent.get('/tests/disciplines').set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    });

});



afterAll(async () => {
    await prisma.$disconnect();
});