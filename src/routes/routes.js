const express = require('express');

const {getAllStaff, getStaffDetail, saveStaff} = require('../controllers/staffControllers');
const {login, saveLoginDetail}  = require('../controllers/loginController');
const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');

const router = express.Router();

router.route("/student").get(getAllStudents).post(saveStudent);
router.route("/student/:email").get(getStudentDetail); 
router.route("/staff").get(getAllStaff).post(saveStaff);
router.route('/staff/:email').get(getStaffDetail);
router.route('/login').post(login).put(saveLoginDetail);

module.exports = router;