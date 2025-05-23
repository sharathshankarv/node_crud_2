const studentModel = require('../models/student');

exports.saveStudent = async (data) =>{
    return await studentModel.create(data);
}

exports.deleteStudent = async(email) => {
    return await studentModel.deleteOne({email: email});
}

exports.getAllStudents = async () => {
    return await studentModel.find();
}

exports.getStudentDetail = async (email) => {
    return await studentModel.findOne(email)
}

