const express = require('express');
const router = express.Router();
const skinAnalysisController = require('../controllers/skinAnalysisController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.post('/analyze', skinAnalysisController.analyzeSkin);
router.get('/history', skinAnalysisController.getSkinAnalysisHistory);
router.get('/latest', skinAnalysisController.getLatestAnalysis);
router.delete('/:analysisId', skinAnalysisController.deleteSkinAnalysis);

module.exports = router;
