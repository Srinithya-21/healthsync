const mongoose = require('mongoose');

// Fitness Log Schema: Stores workout information
const fitnessLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['running', 'cycling', 'swimming', 'weightlifting', 'yoga', 'walking', 'sports', 'cardio', 'other'],
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  distance: {
    type: Number, // in km
    default: null
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  intensity: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    default: 'moderate'
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Create index for faster queries
fitnessLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('FitnessLog', fitnessLogSchema);
