const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');

const { auth, permit } = require('../middlewares');

router.get("/users", auth, permit('admin'), AdminController.getUsers);
router.get("/user/:id", auth, permit('admin'), AdminController.getContentOfUser);

module.exports = router;