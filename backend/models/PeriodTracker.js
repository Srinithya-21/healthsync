const mongoose = require('mongoose');

// Period Tracker Schema: Stores menstrual cycle information
const periodTrackerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    default: null
  },
  symptoms: [
    {
      symptom: {
        type: String,
        enum: ['cramps', 'bloating', 'headache', 'mood_swings', 'fatigue', 'acne', 'breast_tenderness', 'other'],
      },
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'mild'
      }
    }
  ],
  notes: {
    type: String,
    trim: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'calm', 'irritable', 'neutral'],
    default: null
  },
  flowType: {
    type: String,
    enum: ['light', 'normal', 'heavy'],
    default: 'normal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create index for faster queries
periodTrackerSchema.index({ userId: 1, startDate: -1 });

module.exports = mongoose.model('PeriodTracker', periodTrackerSchema);
