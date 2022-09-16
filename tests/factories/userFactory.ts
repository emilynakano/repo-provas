import {faker} from '@faker-js/faker';
import prisma from '../../src/config/database';
import bcrypt from 'bcrypt';

export async function generateUser() {
    const user = {
        email: faker.internet.email(),
        password: "1234567890",
        confirmPassword: "1234567890"
    }

    return user
}

export async function inserUser(user: {password: string, confirmPassword: string, email: string}) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.create({
        data: {
            email: user.email,
            password: passwordHash
        }
    });
}