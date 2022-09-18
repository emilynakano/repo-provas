import prisma from '../config/database';

import { User } from '@prisma/client';

export type CreateUser = Omit<User, "id">;

export async function insertUser(dataUser:CreateUser) {
    await prisma.user.create({
        data: dataUser
    })
}

export async function findByEmail(email: string) {
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

export async function findById(id: number) {
    return await prisma.user.findUnique({
        where: {
            id
        }
    })
}