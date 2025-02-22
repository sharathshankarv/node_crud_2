const router = require('./routes');
// const express = require('express');
// const router = express.Router(); 

const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');

router.route("/student").get(getAllStudents).post(saveStudent);
router.route("/student/:id").get(getStudentDetail);

module.exports=router;