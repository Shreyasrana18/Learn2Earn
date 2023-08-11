const express = require('express');
const router = express.Router();
const { login, register, loginStudent } = require('../controllers/loginauthController');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/loginStudent').post(loginStudent);

module.exports = router;