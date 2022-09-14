import app from '../src/app';
import supertest from 'supertest';

import prisma from "../src/config/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

describe("POST /sign-up", () => {
    it("given a valid user it should return 201", async () => {
        const body = {
            email: "louiss@hotmail.com",
            password: "1234567890",
            confirmPassword: "1234567890"
        }

        const result = await supertest(app).post("/sign-up").send(body);
        const status = result.status;
        
        expect(status).toEqual(201);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});