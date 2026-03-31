const NutritionLog = require('../models/NutritionLog');
const User = require('../models/User');

// Add meal log
exports.addMealLog = async (req, res) => {
  try {
    const { date, mealType, mealName, quantity, calories, protein, carbs, fats, notes } = req.body;

    // Validate required fields
    if (!date || !mealType || !mealName || !calories) {
      return res.status(400).json({ error: 'Date, mealType, mealName, and calories are required' });
    }

    const mealLog = new NutritionLog({
      userId: req.userId,
      date,
      mealType,
      mealName,
      quantity: quantity || '1 serving',
      calories,
      protein: protein || 0,
      carbs: carbs || 0,
      fats: fats || 0,
      notes: notes || ''
    });

    await mealLog.save();

    res.status(201).json({
      message: 'Meal logged successfully',
      data: mealLog
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nutrition logs
exports.getNutritionLogs = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = { userId: req.userId };
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const logs = await NutritionLog.find(filter).sort({ date: -1 });

    res.status(200).json({
      message: 'Nutrition logs retrieved',
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get daily nutrition summary
exports.getDailyNutritionSummary = async (req, res) => {
  try {
    const { date } = req.query;
    const user = await User.findById(req.userId);

    let filter = { userId: req.userId };
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const logs = await NutritionLog.find(filter);

    // Calculate totals
    const totals = {
      calories: logs.reduce((sum, log) => sum + log.calories, 0),
      protein: logs.reduce((sum, log) => sum + log.protein, 0),
      carbs: logs.reduce((sum, log) => sum + log.carbs, 0),
      fats: logs.reduce((sum, log) => sum + log.fats, 0)
    };

    // Get goals from user profile
    const goals = {
      calories: user.dailyCalorieGoal || 2000,
      protein: user.dailyProteinGoal || 50,
      carbs: user.dailyCarbGoal || 225,
      fats: user.dailyFatGoal || 78
    };

    // Calculate remaining
    const remaining = {
      calories: goals.calories - totals.calories,
      protein: goals.protein - totals.protein,
      carbs: goals.carbs - totals.carbs,
      fats: goals.fats - totals.fats
    };

    // Calculate percentages
    const percentages = {
      calories: Math.round((totals.calories / goals.calories) * 100),
      protein: Math.round((totals.protein / goals.protein) * 100),
      carbs: Math.round((totals.carbs / goals.carbs) * 100),
      fats: Math.round((totals.fats / goals.fats) * 100)
    };

    res.status(200).json({
      message: 'Daily nutrition summary',
      data: {
        date: date || new Date().toISOString().split('T')[0],
        totals,
        goals,
        remaining,
        percentages,
        mealCount: logs.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update meal log
exports.updateMealLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const { mealType, mealName, quantity, calories, protein, carbs, fats, notes } = req.body;

    const updates = {};
    if (mealType) updates.mealType = mealType;
    if (mealName) updates.mealName = mealName;
    if (quantity) updates.quantity = quantity;
    if (calories) updates.calories = calories;
    if (protein !== undefined) updates.protein = protein;
    if (carbs !== undefined) updates.carbs = carbs;
    if (fats !== undefined) updates.fats = fats;
    if (notes) updates.notes = notes;

    const log = await NutritionLog.findByIdAndUpdate(logId, updates, { new: true });

    res.status(200).json({
      message: 'Meal log updated',
      data: log
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete meal log
exports.deleteMealLog = async (req, res) => {
  try {
    const { logId } = req.params;

    await NutritionLog.findByIdAndDelete(logId);

    res.status(200).json({
      message: 'Meal log deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
