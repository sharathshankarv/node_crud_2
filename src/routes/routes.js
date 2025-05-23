const express = require('express');
const JWTAuthenticator = require('../utilities/JWTAuthenticator');

const {getStaffDetail,getAllStaff, saveStaff} = require('../controllers/staffControllers');
const {login, getUserDetail, logout }  = require('../controllers/loginController');
const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');
const {getFeesDetails, saveFees} = require('../controllers/feesController');

const router = express.Router();

//Unprotected routes
router.route('/login').post(login);
router.route('/logout').post(logout);

//Protected routes
router.route('/me').get(JWTAuthenticator, getUserDetail);
router.route("/student").get(JWTAuthenticator, getAllStudents).post(JWTAuthenticator,saveStudent);
router.route("/student/:email").get(JWTAuthenticator,getStudentDetail); 
router.route("/staff").get(JWTAuthenticator,getAllStaff).post(JWTAuthenticator,saveStaff);
router.route('/staff/:email').get(JWTAuthenticator,getStaffDetail);
router.route('/fees').post(JWTAuthenticator,saveFees);
router.route('/fees').get(JWTAuthenticator,getFeesDetails);

module.exports = router;