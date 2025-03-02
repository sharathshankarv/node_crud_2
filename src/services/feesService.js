const feeSchema = require("../models/fees");

const saveFees = async (data) => {
    return await feeSchema.create(data);
}

const getFeesDetail = async (email) => {
    return await feeSchema.findOne(email);
}

const updateFees = async (data) => {
    return await feeSchema.update(data);
}

const deleteFees = async (data) => {
    return await feeSchema.delete(data);
}

module.exports = {
    saveFees,
    getFeesDetail,
    updateFees,
    deleteFees
}