import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateUser, inserUser } from './userFactory';
import { faker } from '@faker-js/faker';

dotenv.config();

export async function createToken() {
    const user = await generateUser();
    const insertedUser = await inserUser(user);

    const secretKey = process.env.JWT_SECRET_KEY??'secretKey';
    const token = jwt.sign({id: insertedUser.id}, secretKey, {expiresIn: '30d'})
    
    return token;
}

export async function createWrongToken() {
    const wrongToken = faker.random.alphaNumeric(20);
    
    return wrongToken;
}
