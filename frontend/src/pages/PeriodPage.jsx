// Period Tracker Page
import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiCalendar } from 'react-icons/fi';
import { periodService } from '../services/api';
import { format, addDays } from 'date-fns';

export default function PeriodPage() {
  const [logs, setLogs] = useState([]);
  const [predictions, setPredictions] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    symptoms: [],
    mood: '',
    flowType: 'normal',
    notes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const logsRes = await periodService.getPeriods();
      setLogs(logsRes.data.data);

      const predictionsRes = await periodService.getPredictions();
      setPredictions(predictionsRes.data.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'symptoms') {
      const symptomName = value;
      setFormData(prev => ({
        ...prev,
        symptoms: checked
          ? [...prev.symptoms, { symptom: symptomName, severity: 'mild' }]
          : prev.symptoms.filter(s => s.symptom !== symptomName)
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await periodService.addPeriod(formData);
      setShowForm(false);
      setFormData({
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        symptoms: [],
        mood: '',
        flowType: 'normal',
        notes: '',
      });
      loadData();
    } catch (error) {
      console.error('Error adding period:', error);
    }
  };

  const handleDelete = async (logId) => {
    if (window.confirm('Delete this period log?')) {
      try {
        await periodService.deletePeriod(logId);
        loadData();
      } catch (error) {
        console.error('Error deleting period:', error);
      }
    }
  };

  const symptoms = ['cramps', 'bloating', 'headache', 'mood_swings', 'fatigue', 'acne', 'breast_tenderness'];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Period Tracker</h1>
          <p className="text-gray-600">Track your menstrual cycle and symptoms</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <FiPlus /> Log Period
        </button>
      </div>

      {/* Predictions */}
      {predictions && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📅</span>
              <div>
                <p className="text-sm text-gray-600">Next Period</p>
                <p className="text-2xl font-bold text-pink-600">
                  {predictions.nextPeriodDate}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              In {predictions.daysUntilNextPeriod} days
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🥚</span>
              <div>
                <p className="text-sm text-gray-600">Ovulation</p>
                <p className="text-2xl font-bold text-orange-600">
                  {predictions.ovulationDate}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Cycle length: {predictions.cycleLength} days
            </p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">💚</span>
              <div>
                <p className="text-sm text-gray-600">Fertility Window</p>
                <p className="text-sm font-bold text-green-600">
                  {predictions.fertilityWindow.start} to <br />
                  {predictions.fertilityWindow.end}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="card mb-8">
          <h3 className="text-lg font-semibold mb-4">Log Period</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label">End Date (Optional)</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="label">Flow Type</label>
              <select
                name="flowType"
                value={formData.flowType}
                onChange={handleChange}
                className="input-field"
              >
                <option>light</option>
                <option>normal</option>
                <option>heavy</option>
              </select>
            </div>

            <div>
              <label className="label">Mood</label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select mood</option>
                <option>happy</option>
                <option>sad</option>
                <option>anxious</option>
                <option>calm</option>
                <option>irritable</option>
                <option>neutral</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="label">Symptoms</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {symptoms.map(symptom => (
                  <label key={symptom} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="symptoms"
                      value={symptom}
                      checked={formData.symptoms.some(s => s.symptom === symptom)}
                      onChange={handleChange}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm capitalize">{symptom.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="input-field"
                rows="2"
                placeholder="Additional notes..."
              ></textarea>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="btn-primary flex-1">
                Save Period Log
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

      {/* Period Logs */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        ) : logs.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">No period logs yet. Start tracking your cycle! 📅</p>
          </div>
        ) : (
          logs.map((log) => (
            <div key={log._id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🩸</span>
                    <div>
                      <h3 className="text-lg font-semibold">Period</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(log.startDate).toLocaleDateString()} to{' '}
                        {log.endDate ? new Date(log.endDate).toLocaleDateString() : 'Ongoing'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex gap-4">
                      <span className="text-sm">
                        <strong>Flow:</strong> <span className="capitalize">{log.flowType}</span>
                      </span>
                      {log.mood && (
                        <span className="text-sm">
                          <strong>Mood:</strong> <span className="capitalize">{log.mood.replace('_', ' ')}</span>
                        </span>
                      )}
                    </div>
                    {log.symptoms && log.symptoms.length > 0 && (
                      <div className="text-sm">
                        <strong>Symptoms:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {log.symptoms.map((s, idx) => (
                            <span key={idx} className="bg-pink-100 text-pink-700 px-2 py-1 rounded text-xs">
                              {s.symptom.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {log.notes && (
                      <p className="text-sm text-gray-600 mt-2">📝 {log.notes}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(log._id)}
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
