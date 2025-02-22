const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    rollNo: String,
    addmissionNo: Number,
    address: String,
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;