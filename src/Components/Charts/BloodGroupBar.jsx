import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Droplet } from 'lucide-react';

const BloodGroupBar = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-red-500/10 rounded-2xl">
          <Droplet className="w-7 h-7 text-red-500" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Blood Group Distribution</h2>
          <p className="text-gray-600">Users by blood type</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Legend />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodGroupBar;