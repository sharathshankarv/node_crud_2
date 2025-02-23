const studentService = require('../services/studentServices');
const loginService = require('../services/loginServices');

exports.saveStudent = async (req, res) => {
    let student = null;
    try {
        student = await studentService.saveStudent(req.body);
        if(student){
            const login = await loginService.saveLoginDetail({
                email: req.body.email,
                password: req.body.password,
                role: "student",
                userRef: student._id,
                roleRef: "Student"
            });
            if(!login){
                const delStudent = await studentService.deleteStudent(req.body.email);
                if(!delStudent){
                    console.log("Student not deleted");
                }
            }
        }
        res.json({status: "success", data: student});
    }catch(e){
        if(student){
            const delStudent = await studentService.deleteStudent(req.body.email);
            if(!delStudent){
                console.log("Student not deleted");
            }
        }
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