const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const authMiddleware = require('../middleware/auth');

// All routes are protected
router.use(authMiddleware);

router.post('/message', chatbotController.sendMessage);
router.get('/history', chatbotController.getChatHistory);
router.delete('/history', chatbotController.clearChatHistory);

module.exports = router;
