import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { generateUser, inserUser } from './userFactory';

dotenv.config();

export async function createToken() {
    const user = await generateUser();
    const insertedUser = await inserUser(user);

    const secretKey = process.env.JWT_SECRET_KEY??'secretKey';
    const token = jwt.sign({id: insertedUser.id}, secretKey, {expiresIn: '30d'})
    
    return token;
}