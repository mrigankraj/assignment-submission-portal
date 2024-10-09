const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/upload', authMiddleware.protect, userController.upload);
router.get('/admins', authMiddleware.protect, userController.getAdmins);

module.exports = router;
