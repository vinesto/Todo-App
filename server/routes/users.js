var express = require('express');
var router = express.Router();
var { signIn, signUp, loginFb } = require('../controllers/user')

/* GET users listing. */
router.post('/login',signIn)
router.post('/register', signUp)
router.post('/loginFb', loginFb)

module.exports = router;
