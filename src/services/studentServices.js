const studentModel = require('../models/student');

exports.saveStudent = async (data) =>{
    return await studentModel.create(data);
}

exports.getAllStudents = async () => {
    return await studentModel.find();
}

exports.getStudentDetail = async (id) => {
    return await studentModel.findById(id)
}

