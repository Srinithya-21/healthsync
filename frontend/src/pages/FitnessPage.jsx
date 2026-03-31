// Fitness Tracker Page
import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { fitnessService } from '../services/api';

export default function FitnessPage() {
  const [logs, setLogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'running',
    duration: '30',
    caloriesBurned: '300',
    distance: '',
    intensity: 'moderate',
    notes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const response = await fitnessService.getWorkouts();
      setLogs(response.data.data);
    } catch (error) {
      console.error('Error loading logs:', error);
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
      await fitnessService.addWorkout({
        ...formData,
        duration: parseInt(formData.duration),
        caloriesBurned: parseInt(formData.caloriesBurned),
        distance: formData.distance ? parseFloat(formData.distance) : null,
      });
      setShowForm(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: 'running',
        duration: '30',
        caloriesBurned: '300',
        distance: '',
        intensity: 'moderate',
        notes: '',
      });
      loadLogs();
    } catch (error) {
      console.error('Error adding workout:', error);
    }
  };

  const handleDelete = async (logId) => {
    if (window.confirm('Delete this workout?')) {
      try {
        await fitnessService.deleteWorkout(logId);
        loadLogs();
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fitness Tracker</h1>
          <p className="text-gray-600">Log and track your workouts</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> Add Workout
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Log New Workout</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Exercise Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option>running</option>
                <option>cycling</option>
                <option>swimming</option>
                <option>weightlifting</option>
                <option>yoga</option>
                <option>walking</option>
                <option>sports</option>
                <option>cardio</option>
              </select>
            </div>

            <div>
              <label className="label">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Calories Burned</label>
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">Distance (km)</label>
              <input
                type="number"
                step="0.1"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Intensity</label>
              <select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                className="input-field"
              >
                <option>low</option>
                <option>moderate</option>
                <option>high</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                rows="2"
                placeholder="How did you feel? Any notes?"
              ></textarea>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Save Workout
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

      {/* Workouts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No workouts logged yet. Start by adding your first workout! 💪</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🏃</span>
                    <div>
                      <h3 className="text-lg font-semibold capitalize">{log.type}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(log.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold">{log.duration} mins</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Calories</p>
                      <p className="font-semibold">{log.caloriesBurned} kcal</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Distance</p>
                      <p className="font-semibold">{log.distance ? `${log.distance} km` : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Intensity</p>
                      <p className="font-semibold capitalize">{log.intensity}</p>
                    </div>
                  </div>
                  {log.notes && (
                    <p className="text-sm text-gray-600 mt-2">📝 {log.notes}</p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <FiEdit2 className="text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(log._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <FiTrash2 className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
