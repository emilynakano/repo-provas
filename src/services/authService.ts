import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as authRepository from '../repositories/authRepository';
import * as errorUtils from '../utils/errorUtils';

export async function findUserById(id: number) {
    const user = await authRepository.findById(id);

    return user
}

export async function getUsers() {
    const users = await authRepository.getUsers();
    
    return users
}

export async function createUser(dataUser: authRepository.CreateUser) {
    const { email, password } = dataUser;
    
    const user = await authRepository.findByEmail(email);
    if(user) throw errorUtils.conflictError('user')

    const passwordHash = bcrypt.hashSync(password, 10);
    
    authRepository.insertUser({email, password: passwordHash})
}

export async function loginUser(dataUser: authRepository.CreateUser) {
    const { email, password } = dataUser;

    const user = await authRepository.findByEmail(email);
    if(!user) throw errorUtils.unauthorizedError('credentials');

    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword) throw errorUtils.unauthorizedError('credentials');

    const secretKey = process.env.JWT_SECRET_KEY??'secretKey';
    
    const token = jwt.sign({id: user.id}, secretKey, {expiresIn: '30d'})
    return token;
}