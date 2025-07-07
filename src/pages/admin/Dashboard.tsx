import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatsCard from '../../components/StatsCard';
import { Users, Eye, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const statsData = [
    { title: 'Total Patients', value: '1,247', change: '+12% from last month', icon: Users, trend: 'up' as const, color: 'blue' as const },
    { title: 'Scans Today', value: '89', change: '+8% from yesterday', icon: Eye, trend: 'up' as const, color: 'green' as const },
    { title: 'Accuracy Rate', value: '94.2%', change: '+2.1% improvement', icon: TrendingUp, trend: 'up' as const, color: 'blue' as const },
    { title: 'High Risk Cases', value: '23', change: '-15% from last week', icon: AlertTriangle, trend: 'down' as const, color: 'orange' as const }
  ];

  const monthlyData = [
    { name: 'Jan', scans: 400, accuracy: 92 },
    { name: 'Feb', scans: 500, accuracy: 93.2 },
    { name: 'Mar', scans: 450, accuracy: 94.1 },
    { name: 'Apr', scans: 600, accuracy: 94.8 },
    { name: 'May', scans: 750, accuracy: 94.2 },
    { name: 'Jun', scans: 680, accuracy: 95.1 }
  ];

  const diseaseData = [
    { name: 'Diabetic Retinopathy', value: 35, color: '#ef4444' },
    { name: 'Glaucoma', value: 25, color: '#f97316' },
    { name: 'AMD', value: 20, color: '#eab308' },
    { name: 'Normal', value: 20, color: '#22c55e' }
  ];

  const recentActivity = [
    { time: '2 mins ago', activity: 'New high-risk case detected', type: 'alert' },
    { time: '15 mins ago', activity: 'Batch analysis completed (50 images)', type: 'success' },
    { time: '1 hour ago', activity: 'Dr. Smith reviewed 12 cases', type: 'info' },
    { time: '3 hours ago', activity: 'System accuracy improved to 94.2%', type: 'success' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and management analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="scans" fill="#3b82f6" name="Scans" />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} name="Accuracy %" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Disease Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {diseaseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-3 h-3 rounded-full ${
                  item.type === 'alert' ? 'bg-red-500' :
                  item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{item.activity}</p>
                </div>
                <span className="text-xs text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
