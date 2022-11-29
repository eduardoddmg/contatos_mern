const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/auth.controller');

router.post("/login", AuthControllers.postLogin);
router.post("/register", AuthControllers.postRegister);

module.exports = router;