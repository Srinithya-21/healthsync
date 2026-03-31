const mongoose = require('mongoose');

// Skin Analysis Schema: Stores skin analysis results
const skinAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  analysisDate: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String,
    required: true
  },
  concerns: [
    {
      concern: {
        type: String,
        enum: ['acne', 'dryness', 'oiliness', 'sensitivity', 'redness', 'spots', 'wrinkles', 'dark_circles', 'other'],
        required: true
      },
      severity: {
        type: String,
        enum: ['mild', 'moderate', 'severe'],
        default: 'mild'
      },
      confidence: {
        type: Number, // 0-100
        default: null
      }
    }
  ],
  recommendations: [String],
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
skinAnalysisSchema.index({ userId: 1, analysisDate: -1 });

module.exports = mongoose.model('SkinAnalysis', skinAnalysisSchema);
