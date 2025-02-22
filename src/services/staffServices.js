const Staff = require('../models/staff');

exports.saveStaff = async (data) => {
    return await Staff.create(data);
}

exports.getAllStaff = async() => {
    return await Staff.getAllUser();
}

exports.getStaff = async(email) => {
    return await Staff.findById(email);
}