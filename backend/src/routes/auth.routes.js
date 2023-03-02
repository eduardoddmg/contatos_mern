const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/auth.controller');
const { auth } = require('../middlewares');

router.post("/login", AuthControllers.login);
router.post("/register", AuthControllers.register);
router.get("/", auth, AuthControllers.getUser);

module.exports = router;