import app from '../src/app';
import supertest from 'supertest';

import prisma from "../src/config/database";

import {generateUser, inserUser} from './factories/userFactory'

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

const agent = supertest(app);

describe("POST /sign-up", () => {
    it("given a valid user it should answer with status 201 ", async () => {
        const user = await generateUser()
        const response = await agent.post("/sign-up").send(user);
        
        expect(response.status).toEqual(201);
    });

    it("given a user already registred it should answer with status 409", async () => {
        const user = await generateUser();

        await inserUser(user);

        const response = await agent.post("/sign-up").send(user);
        
        expect(response.status).toEqual(409);
    });
});

describe("POST /sign-in", () => {
    it("given valid credentials should answer with status 200", async () => {
        const user = await generateUser();

        await inserUser(user);

        const response = await agent.post("/sign-in").send({
            email: user.email,
            password: user.password
        });
        
        expect(response.status).toEqual(200);
    });

    it("given invalid credentials should answer with status 401", async () => {
        const user = await generateUser();
        const wrongUser = await generateUser();

        await inserUser(user);

        const response = await agent.post("/sign-in").send({
            email: wrongUser.email,
            password: wrongUser.password
        });
        
        expect(response.status).toEqual(401);
    });

});

afterAll(async () => {
    await prisma.$disconnect();
});