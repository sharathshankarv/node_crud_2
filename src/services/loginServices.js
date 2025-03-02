const loginSchema = require('../models/loginDetail');

const saveLoginDetail = async (data) => {
    return await loginSchema.create(data);
}

const getLogin = async(email) => {
    return await loginSchema.findOne(email);
}

module.exports = {
    saveLoginDetail,
    getLogin
}