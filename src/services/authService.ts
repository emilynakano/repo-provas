import bcrypt from 'bcrypt';

import * as authRepository from '../repositories/authRepository';
import * as errorUtils from '../utils/errorUtils'

export async function createUser(dataUser: authRepository.CreateUser) {
    const { email, password } = dataUser;
    
    const user = await authRepository.findByEmail(email);
    if(user) throw errorUtils.conflictError('user')

    const passwordHash = bcrypt.hashSync(password, 10);
    
    authRepository.insertUser({email, password: passwordHash})
}

export async function loginUser(dataUser: authRepository.CreateUser) {
    const { email, password } = dataUser;
}