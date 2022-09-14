import joi from 'joi';

const createUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
    confirmPassword: joi.any().equal(joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
})

const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export {createUserSchema, loginUserSchema}