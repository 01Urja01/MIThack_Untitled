const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');
const { validateToken } = require('../../middlewares/authMiddleware');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/profile', validateToken, authController.getProfile);
router.put('/profile', validateToken, authController.updateProfile);

module.exports = router; 