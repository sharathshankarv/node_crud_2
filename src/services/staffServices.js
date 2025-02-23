const Staff = require('../models/staff');

exports.saveStaff = async (data) => {
    return await Staff.create(data);
}

exports.deleteStaff = async (email) => {
    return await Staff.deleteOne({ email: email });
}

exports.getAllStaff = async() => {
    return await Staff.getAllUser();
}

exports.getStaff = async(email) => {
    return await Staff.findById(email);
}