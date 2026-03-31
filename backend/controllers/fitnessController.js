const FitnessLog = require('../models/FitnessLog');
const User = require('../models/User');

// Add fitness log
exports.addFitnessLog = async (req, res) => {
  try {
    const { date, type, duration, caloriesBurned, distance, intensity, notes } = req.body;

    // Validate required fields
    if (!date || !type || !duration || !caloriesBurned) {
      return res.status(400).json({ error: 'Date, type, duration, and caloriesBurned are required' });
    }

    const fitnessLog = new FitnessLog({
      userId: req.userId,
      date,
      type,
      duration,
      caloriesBurned,
      distance: distance || null,
      intensity: intensity || 'moderate',
      notes: notes || ''
    });

    await fitnessLog.save();

    res.status(201).json({
      message: 'Fitness log added successfully',
      data: fitnessLog
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get fitness logs (with date range filtering)
exports.getFitnessLogs = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = { userId: req.userId };

    // Apply date filtering if provided
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await FitnessLog.find(filter).sort({ date: -1 });

    res.status(200).json({
      message: 'Fitness logs retrieved',
      count: logs.length,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get fitness stats summary
exports.getFitnessStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let filter = { userId: req.userId };

    // Apply date filtering
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const logs = await FitnessLog.find(filter);

    // Calculate statistics
    const stats = {
      totalWorkouts: logs.length,
      totalMinutes: logs.reduce((sum, log) => sum + log.duration, 0),
      totalCalories: logs.reduce((sum, log) => sum + log.caloriesBurned, 0),
      totalDistance: logs.reduce((sum, log) => sum + (log.distance || 0), 0),
      averageCaloriesPerWorkout: logs.length > 0 ? Math.round(logs.reduce((sum, log) => sum + log.caloriesBurned, 0) / logs.length) : 0,
      workoutsByType: {}
    };

    // Count by type
    logs.forEach(log => {
      stats.workoutsByType[log.type] = (stats.workoutsByType[log.type] || 0) + 1;
    });

    res.status(200).json({
      message: 'Fitness stats retrieved',
      data: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update fitness log
exports.updateFitnessLog = async (req, res) => {
  try {
    const { logId } = req.params;
    const { date, type, duration, caloriesBurned, distance, intensity, notes } = req.body;

    const updates = {};
    if (date) updates.date = date;
    if (type) updates.type = type;
    if (duration) updates.duration = duration;
    if (caloriesBurned) updates.caloriesBurned = caloriesBurned;
    if (distance) updates.distance = distance;
    if (intensity) updates.intensity = intensity;
    if (notes) updates.notes = notes;

    const log = await FitnessLog.findByIdAndUpdate(logId, updates, { new: true });

    res.status(200).json({
      message: 'Fitness log updated',
      data: log
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete fitness log
exports.deleteFitnessLog = async (req, res) => {
  try {
    const { logId } = req.params;

    await FitnessLog.findByIdAndDelete(logId);

    res.status(200).json({
      message: 'Fitness log deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
