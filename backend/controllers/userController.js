const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, age, weight, height, gender, fitnessGoal, dailyCalorieGoal, theme, lastPeriodDate, cycleLength } = req.body;

    const updates = {};
    if (name) updates.name = name;
    if (age) updates.age = age;
    if (weight) updates.weight = weight;
    if (height) updates.height = height;
    if (gender) updates.gender = gender;
    if (fitnessGoal) updates.fitnessGoal = fitnessGoal;
    if (dailyCalorieGoal) updates.dailyCalorieGoal = dailyCalorieGoal;
    if (theme) updates.theme = theme;
    if (lastPeriodDate) updates.lastPeriodDate = lastPeriodDate;
    if (cycleLength) updates.cycleLength = cycleLength;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update nutrition goals
exports.updateNutritionGoals = async (req, res) => {
  try {
    const { dailyCalorieGoal, dailyProteinGoal, dailyCarbGoal, dailyFatGoal } = req.body;

    const updates = {};
    if (dailyCalorieGoal) updates.dailyCalorieGoal = dailyCalorieGoal;
    if (dailyProteinGoal) updates.dailyProteinGoal = dailyProteinGoal;
    if (dailyCarbGoal) updates.dailyCarbGoal = dailyCarbGoal;
    if (dailyFatGoal) updates.dailyFatGoal = dailyFatGoal;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: 'Nutrition goals updated',
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
