const express = require('express');
const { registerUser, loginUser, getLoggedInUser, getAllUsers } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const route = express.Router();

// All the routes for users
route.post('/register', registerUser)
route.post('/login', loginUser)
route.get('/getloggedinuser', authMiddleware, getLoggedInUser)
route.get('/allusers', getAllUsers)

module.exports = route;