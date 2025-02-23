const loginSchema = require('../models/loginDetail');

exports.saveLoginDetail = async (data) => {
    return await loginSchema.create(data);
}

exports.getLogin = async(email) => {
    return await loginSchema.findOne(email);
}