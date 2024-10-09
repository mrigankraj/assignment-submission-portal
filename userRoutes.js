const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const { validateUser, validateAssignment, validate } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validateUser, validate, userController.register);
router.post('/login', userController.login);
router.post('/upload', authMiddleware.protect, validateAssignment, validate, userController.upload);
router.get('/admins', authMiddleware.protect, userController.getAdmins);

module.exports = router;
