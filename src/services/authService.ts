import { User } from '@prisma/client';

type CreateUser = Omit<User, "id">;

export async function createUser(dataUser:CreateUser) {
    
}

export async function loginUser(dataUser:CreateUser) {
    
}