const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true, index: true},
    password: {type: String, required: true},
    dob: {type: Date, required: true},
    rollNo: {type: String, unique: true, sparse: true},
    addmissionNo: {type: String, unique: true},
    address: {type: String},
    createdOn: {type: Date, default: Date.now},
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;