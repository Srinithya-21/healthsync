const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.put('/nutrition-goals', userController.updateNutritionGoals);

module.exports = router;
