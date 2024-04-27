import Joi from 'joi';

export const event = Joi.object().keys({
    name: Joi.string().trim().min(1).max(30).required(),
    subCategoryId: Joi.string().hex().length(24).required(),
    description: Joi.string().trim().min(6).required(),
});
