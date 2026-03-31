// Progress Chart Component - Placeholder for chart visualization
import React from 'react';

export default function ProgressChart() {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
      <div className="h-64 flex items-end justify-around gap-2">
        {[45, 60, 65, 50, 70, 55, 68].map((value, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-8 bg-gradient-to-t from-pink-500 to-pink-300 rounded-t"
              style={{ height: `${(value / 70) * 100}%` }}
            ></div>
            <label className="text-xs text-gray-500 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
