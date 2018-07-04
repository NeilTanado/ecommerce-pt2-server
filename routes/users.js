const express = require('express');
const router = express.Router();
const Auth = require('../middlewares/auth');
const Controller = require('../controller/userController');

router.post('/createuser', Auth.cekCreateUser , Controller.createUser);
router.post('/login', Controller.loginUser);

module.exports = router;
