const SkinAnalysis = require('../models/SkinAnalysis');

// Mock skin analysis function
const performMockSkinAnalysis = (imageUrl) => {
  // Simulate different analysis results
  const analysisOptions = [
    {
      concerns: [
        { concern: 'acne', severity: 'mild', confidence: 75 },
        { concern: 'oiliness', severity: 'moderate', confidence: 80 }
      ],
      recommendations: [
        'Use a gentle cleanser twice daily',
        'Apply oil-control moisturizer',
        'Consider using salicylic acid treatment 2-3 times per week',
        'Avoid touching your face throughout the day'
      ]
    },
    {
      concerns: [
        { concern: 'dryness', severity: 'moderate', confidence: 85 }
      ],
      recommendations: [
        'Use a hydrating cleanser',
        'Apply a rich moisturizer morning and night',
        'Use a facial oil or serum',
        'Stay hydrated by drinking plenty of water',
        'Consider using a humidifier during dry seasons'
      ]
    },
    {
      concerns: [
        { concern: 'redness', severity: 'mild', confidence: 70 },
        { concern: 'sensitivity', severity: 'mild', confidence: 65 }
      ],
      recommendations: [
        'Use fragrance-free products',
        'Avoid harsh scrubs and over-exfoliating',
        'Use a gentle, non-irritating sunscreen',
        'Apply soothing products with aloe or chamomile',
        'Avoid extreme temperature changes'
      ]
    },
    {
      concerns: [
        { concern: 'dark_circles', severity: 'moderate', confidence: 78 }
      ],
      recommendations: [
        'Get adequate sleep (7-9 hours)',
        'Apply caffeine-based eye cream',
        'Use cold compress in the morning',
        'Manage stress through meditation or exercise',
        'Stay well hydrated'
      ]
    }
  ];

  return analysisOptions[Math.floor(Math.random() * analysisOptions.length)];
};

// Analyze skin via image
exports.analyzeSkin = async (req, res) => {
  try {
    const { imageUrl, notes } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Perform mock analysis
    const analysis = performMockSkinAnalysis(imageUrl);

    // Create skin analysis record
    const skinAnalysis = new SkinAnalysis({
      userId: req.userId,
      imageUrl,
      concerns: analysis.concerns,
      recommendations: analysis.recommendations,
      notes: notes || ''
    });

    await skinAnalysis.save();

    res.status(201).json({
      message: 'Skin analysis completed',
      data: skinAnalysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get skin analysis history
exports.getSkinAnalysisHistory = async (req, res) => {
  try {
    const analyses = await SkinAnalysis.find({ userId: req.userId }).sort({ analysisDate: -1 });

    res.status(200).json({
      message: 'Skin analysis history retrieved',
      count: analyses.length,
      data: analyses
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get latest skin analysis
exports.getLatestAnalysis = async (req, res) => {
  try {
    const analysis = await SkinAnalysis.findOne({ userId: req.userId }).sort({ analysisDate: -1 });

    if (!analysis) {
      return res.status(404).json({ error: 'No skin analysis found' });
    }

    res.status(200).json({
      message: 'Latest skin analysis retrieved',
      data: analysis
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete skin analysis
exports.deleteSkinAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    await SkinAnalysis.findByIdAndDelete(analysisId);

    res.status(200).json({
      message: 'Skin analysis deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
