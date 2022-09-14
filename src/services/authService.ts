import bcrypt from 'bcrypt'

import { User } from '@prisma/client';

type CreateUser = Omit<User, "id">;

export async function createUser(dataUser:CreateUser) {
    const { email, password } = dataUser;
    
    const passwordHash = bcrypt.hashSync(password, 10);
  
}

export async function loginUser(dataUser:CreateUser) {
    
}