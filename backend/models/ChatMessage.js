const mongoose = require('mongoose');

// Chat Message Schema: Stores chatbot conversation history
const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
chatMessageSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);
