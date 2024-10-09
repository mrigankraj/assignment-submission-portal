const express = require('express');
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/assignments', authMiddleware.protect, authMiddleware.restrictTo('admin'), adminController.getAssignments);
router.post('/assignments/:id/accept', authMiddleware.protect, authMiddleware.restrictTo('admin'), adminController.acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware.protect, authMiddleware.restrictTo('admin'), adminController.rejectAssignment);

module.exports = router;
