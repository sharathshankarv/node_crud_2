const express = require('express');
const router = express.Router(); 

const {getUser, getAllUser, saveUser} = require('../controllers/userControllers');