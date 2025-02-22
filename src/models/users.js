const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    role: { type: String, enum: ["student", "staff"], required: true, index: true },
    email: {type: String, unique: true, required: true, index: true},
    dob: {type: Date, required: true},
    rollNo: {type: String, unique: true, sparse: true},
    addmissionNo: {type: String, unique: true},
    address: {type: String},
    createdOn: {type: Date, default: Date.now},
    department: { type: String, sparse: true },
    designation: { type: String, sparse: true }
})

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;