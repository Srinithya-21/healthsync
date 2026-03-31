// Profile Management Page
import React, { useState, useEffect } from 'react';
import { FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import { userService } from '../services/api';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: '',
    fitnessGoal: '',
    dailyCalorieGoal: '',
    dailyProteinGoal: '',
    dailyCarbGoal: '',
    dailyFatGoal: '',
    cycleLength: '',
    lastPeriodDate: '',
    theme: 'light',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getProfile();
      setFormData({
        name: response.data.name || '',
        age: response.data.age || '',
        weight: response.data.weight || '',
        height: response.data.height || '',
        gender: response.data.gender || '',
        fitnessGoal: response.data.fitnessGoal || '',
        dailyCalorieGoal: response.data.dailyCalorieGoal || '',
        dailyProteinGoal: response.data.dailyProteinGoal || '',
        dailyCarbGoal: response.data.dailyCarbGoal || '',
        dailyFatGoal: response.data.dailyFatGoal || '',
        cycleLength: response.data.cycleLength || '',
        lastPeriodDate: response.data.lastPeriodDate ? response.data.lastPeriodDate.split('T')[0] : '',
        theme: response.data.theme || 'light',
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      setMessage('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await userService.updateProfile(formData);
      setMessage('Profile updated successfully! ✓');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600">Manage your health information and goals</p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Fitness Goals */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Fitness Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Fitness Goal</label>
              <select
                name="fitnessGoal"
                value={formData.fitnessGoal}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select goal</option>
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="endurance">Endurance</option>
                <option value="general_fitness">General Fitness</option>
              </select>
            </div>

            <div>
              <label className="label">Daily Calorie Goal</label>
              <input
                type="number"
                name="dailyCalorieGoal"
                value={formData.dailyCalorieGoal}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Nutrition Goals */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Nutrition Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Daily Protein Goal (g)</label>
              <input
                type="number"
                name="dailyProteinGoal"
                value={formData.dailyProteinGoal}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Daily Carbs Goal (g)</label>
              <input
                type="number"
                name="dailyCarbGoal"
                value={formData.dailyCarbGoal}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Daily Fats Goal (g)</label>
              <input
                type="number"
                name="dailyFatGoal"
                value={formData.dailyFatGoal}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Period Tracking (for women) */}
        {formData.gender === 'female' && (
          <div className="card">
            <h3 className="text-xl font-semibold mb-6">Period Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Cycle Length (days)</label>
                <input
                  type="number"
                  name="cycleLength"
                  value={formData.cycleLength}
                  onChange={handleChange}
                  placeholder="Usually 28"
                  className="input-field"
                />
              </div>

              <div>
                <label className="label">Last Period Date</label>
                <input
                  type="date"
                  name="lastPeriodDate"
                  value={formData.lastPeriodDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* Theme Preference */}
        <div className="card">
          <h3 className="text-xl font-semibold mb-6">Preferences</h3>
          <div>
            <label className="label">Theme</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="input-field max-w-xs"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave /> {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}
