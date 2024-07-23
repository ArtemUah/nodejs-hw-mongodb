import Joi from 'joi';

export const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
});


export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(20).required(),
});

export const resetEmailSchema = Joi.object({
    email: Joi.string().email().required(),
});


export const newPasswordSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
});
