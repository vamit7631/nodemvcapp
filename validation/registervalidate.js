const Joi = require('joi');

module.exports.createValidation = async function (req) {
    const createRegisterSchema = Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        useremail: Joi.string().required(),
        dob: Joi.string().required(),
        gender: Joi.string().required()
    });

    return await Joi.validate(req.body , createRegisterSchema);
}
