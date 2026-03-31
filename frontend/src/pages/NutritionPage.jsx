// Nutrition Tracker Page
import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { nutritionService, userService } from '../services/api';

export default function NutritionPage() {
  const [meals, setMeals] = useState([]);
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [formData, setFormData] = useState({
    mealType: 'breakfast',
    mealName: '',
    quantity: '1 serving',
    calories: '',
    protein: '0',
    carbs: '0',
    fats: '0',
    notes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const mealsRes = await nutritionService.getMeals({ date: selectedDate });
      setMeals(mealsRes.data.data);

      const summaryRes = await nutritionService.getDailySummary(selectedDate);
      setSummary(summaryRes.data.data);

      if (!user) {
        const userRes = await userService.getProfile();
        setUser(userRes.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await nutritionService.addMeal({
        date: selectedDate,
        ...formData,
        calories: parseInt(formData.calories),
        protein: parseInt(formData.protein),
        carbs: parseInt(formData.carbs),
        fats: parseInt(formData.fats),
      });
      setShowForm(false);
      setFormData({
        mealType: 'breakfast',
        mealName: '',
        quantity: '1 serving',
        calories: '',
        protein: '0',
        carbs: '0',
        fats: '0',
        notes: '',
      });
      loadData();
    } catch (error) {
      console.error('Error adding meal:', error);
    }
  };

  const handleDelete = async (logId) => {
    if (window.confirm('Delete this meal?')) {
      try {
        await nutritionService.deleteMeal(logId);
        loadData();
      } catch (error) {
        console.error('Error deleting meal:', error);
      }
    }
  };

  const getMealEmoji = (type) => {
    const emojis = { breakfast: '🥐', lunch: '🍽️', dinner: '🍴', snack: '🍪' };
    return emojis[type] || '🍽️';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Nutrition Tracker</h1>
          <p className="text-gray-600">Track your meals and macros</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> Add Meal
        </button>
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input-field max-w-xs"
        />
      </div>

      {/* Daily Summary */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Calories</p>
            <p className="text-3xl font-bold text-orange-500">{summary.totals.calories}</p>
            <p className="text-xs text-gray-500 mt-2">Goal: {summary.goals.calories}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${summary.percentages.calories}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Protein</p>
            <p className="text-3xl font-bold text-red-500">{summary.totals.protein}g</p>
            <p className="text-xs text-gray-500 mt-2">Goal: {summary.goals.protein}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${summary.percentages.protein}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Carbs</p>
            <p className="text-3xl font-bold text-blue-500">{summary.totals.carbs}g</p>
            <p className="text-xs text-gray-500 mt-2">Goal: {summary.goals.carbs}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${summary.percentages.carbs}%` }}
              ></div>
            </div>
          </div>

          <div className="card">
            <p className="text-sm text-gray-600 mb-2">Fats</p>
            <p className="text-3xl font-bold text-green-500">{summary.totals.fats}g</p>
            <p className="text-xs text-gray-500 mt-2">Goal: {summary.goals.fats}g</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${summary.percentages.fats}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Log New Meal</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Meal Type</label>
              <select
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option>breakfast</option>
                <option>lunch</option>
                <option>dinner</option>
                <option>snack</option>
              </select>
            </div>

            <div>
              <label className="label">Meal Name</label>
              <input
                type="text"
                name="mealName"
                value={formData.mealName}
                onChange={handleChange}
                placeholder="e.g., Chicken Salad"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="1 serving"
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Protein (g)</label>
              <input type="number" name="protein" value={formData.protein} onChange={handleChange} className="input-field" />
            </div>

            <div>
              <label className="label">Carbs (g)</label>
              <input type="number" name="carbs" value={formData.carbs} onChange={handleChange} className="input-field" />
            </div>

            <div>
              <label className="label">Fats (g)</label>
              <input type="number" name="fats" value={formData.fats} onChange={handleChange} className="input-field" />
            </div>

            <div className="md:col-span-2">
              <label className="label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                rows="2"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Save Meal
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Meals List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : meals.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No meals logged for this date. Add your first meal! 🍎</p>
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{getMealEmoji(meal.mealType)}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{meal.mealName}</h3>
                      <p className="text-sm text-gray-500 capitalize">{meal.mealType} • {meal.quantity}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-semibold text-orange-500">{meal.calories} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Protein</p>
                      <p className="font-semibold text-red-500">{meal.protein}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Carbs</p>
                      <p className="font-semibold text-blue-500">{meal.carbs}g</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fats</p>
                      <p className="font-semibold text-green-500">{meal.fats}g</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(meal._id)}
                  className="p-2 hover:bg-gray-100 rounded-lg ml-4"
                >
                  <FiTrash2 className="text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
