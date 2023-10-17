const express = require('express');
const router = express.Router();
//const controllers
const { register, login, logout } = require('../controllers/auth');

//routes
router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/logout/:userId').delete(logout);

module.exports = router;