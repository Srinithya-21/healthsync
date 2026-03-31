const FitnessLog = require('../models/FitnessLog');
const NutritionLog = require('../models/NutritionLog');
const PeriodTracker = require('../models/PeriodTracker');
const User = require('../models/User');

// Get comprehensive dashboard data
exports.getDashboardData = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const user = await User.findById(req.userId);

    let dateFilter = {};
    if (startDate && endDate) {
      dateFilter = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      // Default to last 7 days
      const endD = new Date();
      const startD = new Date(endD);
      startD.setDate(startD.getDate() - 7);
      dateFilter = {
        $gte: startD,
        $lte: endD
      };
    }

    // Fetch all data
    const fitnessLogs = await FitnessLog.find({
      userId: req.userId,
      date: dateFilter
    }).sort({ date: -1 });

    const nutritionLogs = await NutritionLog.find({
      userId: req.userId,
      date: dateFilter
    }).sort({ date: -1 });

    const periodLogs = await PeriodTracker.find({
      userId: req.userId,
      startDate: dateFilter
    }).sort({ startDate: -1 });

    // Calculate fitness summary
    const fitnessSummary = {
      totalWorkouts: fitnessLogs.length,
      totalCaloriesBurned: fitnessLogs.reduce((sum, log) => sum + log.caloriesBurned, 0),
      totalMinutes: fitnessLogs.reduce((sum, log) => sum + log.duration, 0),
      averageCaloriesPerWorkout: fitnessLogs.length > 0 
        ? Math.round(fitnessLogs.reduce((sum, log) => sum + log.caloriesBurned, 0) / fitnessLogs.length) 
        : 0
    };

    // Calculate nutrition summary
    const nutritionSummary = {
      totalCalories: nutritionLogs.reduce((sum, log) => sum + log.calories, 0),
      totalProtein: nutritionLogs.reduce((sum, log) => sum + log.protein, 0),
      totalCarbs: nutritionLogs.reduce((sum, log) => sum + log.carbs, 0),
      totalFats: nutritionLogs.reduce((sum, log) => sum + log.fats, 0),
      mealsLogged: nutritionLogs.length,
      averageCaloriesPerDay: Math.round(nutritionLogs.reduce((sum, log) => sum + log.calories, 0) / 7)
    };

    // Fitness vs Nutrition Balance
    const balance = {
      caloriesBurned: fitnessSummary.totalCaloriesBurned,
      caloriesConsumed: nutritionSummary.totalCalories,
      netCalories: nutritionSummary.totalCalories - fitnessSummary.totalCaloriesBurned
    };

    // Period information
    const lastPeriod = periodLogs.length > 0 ? periodLogs[0] : null;

    res.status(200).json({
      message: 'Dashboard data retrieved',
      data: {
        userProfile: {
          name: user.name,
          age: user.age,
          weight: user.weight,
          height: user.height,
          fitnessGoal: user.fitnessGoal,
          dailyCalorieGoal: user.dailyCalorieGoal
        },
        fitness: fitnessSummary,
        nutrition: nutritionSummary,
        balance,
        lastPeriod: lastPeriod ? {
          startDate: lastPeriod.startDate,
          endDate: lastPeriod.endDate,
          symptoms: lastPeriod.symptoms,
          mood: lastPeriod.mood
        } : null,
        recentLogs: {
          lastFitnessLog: fitnessLogs[0] || null,
          lastMealLog: nutritionLogs[0] || null
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get weekly progress
exports.getWeeklyProgress = async (req, res) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    const fitnessLogs = await FitnessLog.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort({ date: 1 });

    // Group by day
    const dailyData = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateKey = date.toISOString().split('T')[0];
      dailyData[dateKey] = {
        date: dateKey,
        workouts: 0,
        caloriesBurned: 0
      };
    }

    fitnessLogs.forEach(log => {
      const dateKey = new Date(log.date).toISOString().split('T')[0];
      if (dailyData[dateKey]) {
        dailyData[dateKey].workouts++;
        dailyData[dateKey].caloriesBurned += log.caloriesBurned;
      }
    });

    res.status(200).json({
      message: 'Weekly progress data',
      data: Object.values(dailyData)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get monthly insights
exports.getMonthlyInsights = async (req, res) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setMonth(startDate.getMonth() - 1);

    const fitnessLogs = await FitnessLog.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    });

    const nutritionLogs = await NutritionLog.find({
      userId: req.userId,
      date: { $gte: startDate, $lte: endDate }
    });

    // Calculate trends
    const fitnessStats = {
      totalWorkouts: fitnessLogs.length,
      totalCalories: fitnessLogs.reduce((sum, log) => sum + log.caloriesBurned, 0),
      averageCaloriesPerWorkout: fitnessLogs.length > 0 
        ? Math.round(fitnessLogs.reduce((sum, log) => sum + log.caloriesBurned, 0) / fitnessLogs.length)
        : 0
    };

    const nutritionStats = {
      totalMeals: nutritionLogs.length,
      averageDailyCalories: Math.round(nutritionLogs.reduce((sum, log) => sum + log.calories, 0) / 30)
    };

    // Insights
    const insights = [];
    if (fitnessStats.totalWorkouts < 10) {
      insights.push('💪 Try to increase workout frequency for better results');
    } else if (fitnessStats.totalWorkouts >= 20) {
      insights.push('🎉 Great job maintaining consistent workouts!');
    }

    if (nutritionStats.averageDailyCalories > 2500) {
      insights.push('⚠️ Your daily calorie intake seems high, consider reviewing meals');
    }

    res.status(200).json({
      message: 'Monthly insights',
      data: {
        fitness: fitnessStats,
        nutrition: nutritionStats,
        insights
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
