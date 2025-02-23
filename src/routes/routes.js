const express = require('express');
const JWTAuthenticator = require('../utilities/JWTAuthenticator');

const {getStaffDetail,getAllStaff, saveStaff} = require('../controllers/staffControllers');
const {login}  = require('../controllers/loginController');
const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');

const router = express.Router();

//Unprotected routes
router.route('/login').post(login);

//Protected routes
router.route("/student").get(JWTAuthenticator, getAllStudents).post(JWTAuthenticator,saveStudent);
router.route("/student/:email").get(JWTAuthenticator,getStudentDetail); 
router.route("/staff").get(JWTAuthenticator,getAllStaff).post(JWTAuthenticator,saveStaff);
router.route('/staff/:email').get(JWTAuthenticator,getStaffDetail);

module.exports = router;