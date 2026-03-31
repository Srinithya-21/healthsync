// Stat Card Component
import React from 'react';

export default function StatCard({ icon: Icon, title, value, subtitle, color }) {
  return (
    <div className="card flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <Icon className={`text-2xl ${color}`} />
      </div>
    </div>
  );
}
