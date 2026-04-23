import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';

const AgeGroupLine = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl text-white">
          <Activity className="w-7 h-7" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Age Distribution</h2>
          <p className="text-gray-600">Users across age groups</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 14, fontWeight: 600, fill: '#64748b' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 14, fontWeight: 600, fill: '#64748b' }}
          />
          <Tooltip 
            contentStyle={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0,0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#3B82F6" 
            strokeWidth={4}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AgeGroupLine;