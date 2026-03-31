const mongoose = require('mongoose');

// Nutrition Log Schema: Stores meal information
const nutritionLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  mealName: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: String,
    default: '1 serving'
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number, // in grams
    default: 0
  },
  carbs: {
    type: Number, // in grams
    default: 0
  },
  fats: {
    type: Number, // in grams
    default: 0
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
nutritionLogSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('NutritionLog', nutritionLogSchema);
