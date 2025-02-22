const studentService = require('../services/studentServices');

exports.saveStudent = async (req, res) => {
    try {
        // const { name,dob,rollNo,addmissionNo,address } = req;
        console.log("saveStudent", req.body);
        const student = await studentService.saveStudent(req.body);
        res.json({status: "success", data: student});
    }catch(e){
        res.status(500).json({ error: e.message }); 
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.json({ data: students, status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

exports.getStudentDetail = async (req, res) => {
    const { id } = req;
    try {
        const studentDet = await studentService.getStudentDetail(id);
        res.json({ data: studentDet, status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}