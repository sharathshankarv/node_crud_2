const userModels = require('../models/user');

exports.saveUser = async (data) => {
    return await userModels.create(data);
}

exports.getAllUser = async() => {
    return await userModels.getAllUser();
}

exports.getUser = async(email) => {
    return await userModels.findById(email);
}