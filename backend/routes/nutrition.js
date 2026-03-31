const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.post('/meal', nutritionController.addMealLog);
router.get('/meals', nutritionController.getNutritionLogs);
router.get('/daily-summary', nutritionController.getDailyNutritionSummary);
router.put('/meal/:logId', nutritionController.updateMealLog);
router.delete('/meal/:logId', nutritionController.deleteMealLog);

module.exports = router;
