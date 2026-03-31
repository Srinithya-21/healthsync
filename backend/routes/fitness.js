const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitnessController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.post('/log', fitnessController.addFitnessLog);
router.get('/logs', fitnessController.getFitnessLogs);
router.get('/stats', fitnessController.getFitnessStats);
router.put('/log/:logId', fitnessController.updateFitnessLog);
router.delete('/log/:logId', fitnessController.deleteFitnessLog);

module.exports = router;
