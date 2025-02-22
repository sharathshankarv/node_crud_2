const express = require('express');

const {getAllUser, getUser,saveUser} = require('../controllers/userControllers');
const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');

const router = express.Router();

router.route("/student").get(getAllStudents).post(saveStudent);
router.route("/student/:id").get(getStudentDetail);
router.route("/user").get(getAllUser).post(saveUser);
router.route('/user/:email').get(getUser);



module.exports = router;