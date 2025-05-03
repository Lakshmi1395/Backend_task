const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const Auth = require('../middleware/auth');

/* GET users listing. */

router.post('/register', usersController.Register);

router.post('/login', usersController.Login);

router.post('/verifyotp', Auth.AuthMiddleware, usersController.VerifyOtp);

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;