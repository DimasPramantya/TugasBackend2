const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userCreateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword
        .string()
        .minOfLowercase(4)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
    shortName:Joi.string().required(),
    fullName: Joi.string().required(),
    biodata: Joi.string().required(),
    angkatan: Joi.number().required(),
    jabatan: Joi.string().required(),
}).unknown();

const userUpdateSchema = Joi.object({
    id: Joi.number().required(),
    fullName: Joi.string().required(),
    biodata: Joi.string().required(),
    shortName: Joi.string().required(),
    angkatan: Joi.string().required(),
    jabatan: Joi.string().required(),
}).unknown();

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: joiPassword
        .string()
        .minOfLowercase(4)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .required(),
})

module.exports = {
    userCreateSchema,
    userUpdateSchema,
    userLoginSchema,
}