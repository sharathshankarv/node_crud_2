const express = require('express');
const JWTAuthenticator = require('../utilities/JWTAuthenticator');

const {getStaffDetail,getAllStaff, saveStaff} = require('../controllers/staffControllers');
const {login, getUserDetail, logout }  = require('../controllers/loginController');
const {getAllStudents, getStudentDetail, saveStudent} = require('../controllers/studentControllers');
const {getFeesDetails, saveFees} = require('../controllers/feesController');

const router = express.Router();

const routePrefix = '/api/v1';
//Unprotected routes
router.route(`${routePrefix}/login`).post(login);
router.route(`${routePrefix}/logout`).post(logout);

//Protected routes
router.route(`${routePrefix}/me`).get(JWTAuthenticator, getUserDetail);
router.route(`${routePrefix}/student`).get(JWTAuthenticator, getAllStudents).post(JWTAuthenticator,saveStudent);
router.route(`${routePrefix}/student/:email`).get(JWTAuthenticator,getStudentDetail); 
router.route(`${routePrefix}/staff`).get(JWTAuthenticator,getAllStaff).post(JWTAuthenticator,saveStaff);
router.route(`${routePrefix}/staff/:email`).get(JWTAuthenticator,getStaffDetail);
router.route(`${routePrefix}/fees`).post(JWTAuthenticator,saveFees);
router.route(`${routePrefix}/fees`).get(JWTAuthenticator,getFeesDetails);

module.exports = router;