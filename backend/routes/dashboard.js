const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.get('/data', dashboardController.getDashboardData);
router.get('/weekly-progress', dashboardController.getWeeklyProgress);
router.get('/monthly-insights', dashboardController.getMonthlyInsights);

module.exports = router;
