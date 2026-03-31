// Dashboard Page - Main overview
import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiApple, FiCalendar, FiActivity, FiBarChart2, FiRefreshCw } from 'react-icons/fi';
import { dashboardService, userService } from '../services/api';
import StatCard from '../components/StatCard';
import ProgressChart from '../components/ProgressChart';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    loadUserProfile();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await dashboardService.getDashboardData();
      setData(response.data.data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your health metrics</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FiActivity}
          title="Workouts"
          value={data?.fitness?.totalWorkouts || 0}
          subtitle="This week"
          color="text-blue-500"
        />
        <StatCard
          icon={FiTrendingUp}
          title="Calories Burned"
          value={`${data?.fitness?.totalCaloriesBurned || 0} kcal`}
          subtitle="7 day average"
          color="text-orange-500"
        />
        <StatCard
          icon={FiApple}
          title="Avg Daily Intake"
          value={`${data?.nutrition?.averageDailyCalories || 0} kcal`}
          subtitle="Last 7 days"
          color="text-green-500"
        />
        <StatCard
          icon={FiCalendar}
          title="Period Cycle"
          value={data?.userProfile?.gender === 'female' ? 'Active' : 'N/A'}
          subtitle="Tracking"
          color="text-pink-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Fitness vs Nutrition Balance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Calorie Balance</h3>
            <FiBarChart2 className="text-pink-500" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Burned</span>
                <span className="text-sm font-bold text-orange-500">
                  {data?.balance?.caloriesBurned || 0} kcal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      ((data?.balance?.caloriesBurned || 0) / (data?.nutrition?.totalCalories || 1)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Consumed</span>
                <span className="text-sm font-bold text-green-500">
                  {data?.balance?.caloriesConsumed || 0} kcal
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(
                      ((data?.balance?.caloriesConsumed || 0) / (data?.nutrition?.totalCalories || 1)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Net</span>
                <span
                  className={`text-sm font-bold ${
                    (data?.balance?.netCalories || 0) < 0
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {data?.balance?.netCalories || 0} kcal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {data?.recentLogs?.lastFitnessLog && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiActivity className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {data.recentLogs.lastFitnessLog.type}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.recentLogs.lastFitnessLog.duration} mins • 
                    {data.recentLogs.lastFitnessLog.caloriesBurned} kcal
                  </p>
                </div>
              </div>
            )}
            {data?.recentLogs?.lastMealLog && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiApple className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {data.recentLogs.lastMealLog.mealName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.recentLogs.lastMealLog.calories} kcal
                  </p>
                </div>
              </div>
            )}
            {!data?.recentLogs?.lastFitnessLog && !data?.recentLogs?.lastMealLog && (
              <p className="text-gray-500 text-sm">No recent activity</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="card text-center hover:shadow-lg cursor-pointer">
          <div className="text-3xl mb-2">🏃</div>
          <h4 className="font-semibold">Log Workout</h4>
          <p className="text-xs text-gray-500 mt-1">Track your fitness</p>
        </button>
        <button className="card text-center hover:shadow-lg cursor-pointer">
          <div className="text-3xl mb-2">🍽️</div>
          <h4 className="font-semibold">Log Meal</h4>
          <p className="text-xs text-gray-500 mt-1">Track nutrition</p>
        </button>
        <button className="card text-center hover:shadow-lg cursor-pointer">
          <div className="text-3xl mb-2">📅</div>
          <h4 className="font-semibold">Period Log</h4>
          <p className="text-xs text-gray-500 mt-1">Track cycle</p>
        </button>
      </div>
    </div>
  );
}
