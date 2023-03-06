const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

const { auth, permit } = require('../middlewares');

router.get("/users", auth,  AdminController.getUsers);
router.get("/user/:id", auth, AdminController.getContentOfUser);

module.exports = router;