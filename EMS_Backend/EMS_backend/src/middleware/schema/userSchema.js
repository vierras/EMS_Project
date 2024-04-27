import Joi from 'joi';

  const validRoles = ['user', 'admin'];
export const registerUserSchema = Joi.object().keys({
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(6).max(30),
    firstname: Joi.string().trim().min(1).max(30),
    lastname: Joi.string().trim().min(1).max(30).required(),
    role: Joi.string().valid(...validRoles).min(1).max(30).required(),
    address: Joi.string().trim().min(1).max(30).required(),
    city: Joi.string().trim().min(1).max(30).required(),
    country: Joi.string().trim().min(1).max(30).required(),
    phoneNumber: Joi.string().trim().min(1).max(10).required()
})
.unknown(true)


export const updateUserSchema = Joi.object().keys({
    email: Joi.string().trim().email(),
    password: Joi.forbidden(),
    firstname: Joi.string().trim().min(1).max(30),
    lastname: Joi.string().trim().min(1).max(30),
    role: Joi.string().valid('admin', 'user'),
    address: Joi.string().trim().min(1).max(30),
    city: Joi.string().trim().min(1).max(30),
    country: Joi.string().trim().min(1).max(30),
    phoneNumber: Joi.string().trim().min(1).max(10),
}).unknown(true);

export const resetPasswordInputs = Joi.object().keys({
    password: Joi.string().trim().min(6).max(30).required(),
    confirmpassword : Joi.string().trim().min(6).max(30).required().valid(Joi.ref('password')),
    token: Joi.string().required(),
});