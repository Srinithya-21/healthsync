const express = require('express');
const router = express.Router();
const periodController = require('../controllers/periodController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.post('/log', periodController.addPeriodLog);
router.get('/logs', periodController.getPeriodLogs);
router.get('/predictions', periodController.getPeriodPredictions);
router.put('/log/:logId', periodController.updatePeriodLog);
router.delete('/log/:logId', periodController.deletePeriodLog);

module.exports = router;
