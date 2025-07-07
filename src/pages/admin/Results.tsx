import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Eye, Users, Calendar } from 'lucide-react';

const AdminResults = () => {
  const performanceData = [
    { month: 'Jan', accuracy: 89.5, sensitivity: 87.2, specificity: 91.8, cases: 120 },
    { month: 'Feb', accuracy: 91.2, sensitivity: 89.5, specificity: 92.9, cases: 150 },
    { month: 'Mar', accuracy: 92.8, sensitivity: 90.8, specificity: 94.7, cases: 180 },
    { month: 'Apr', accuracy: 93.5, sensitivity: 91.5, specificity: 95.2, cases: 200 },
    { month: 'May', accuracy: 94.2, sensitivity: 92.1, specificity: 96.1, cases: 220 },
    { month: 'Jun', accuracy: 95.1, sensitivity: 93.2, specificity: 96.8, cases: 250 }
  ];

  const diseaseAccuracy = [
    { disease: 'Diabetic Retinopathy', accuracy: 96.5, cases: 450 },
    { disease: 'Glaucoma', accuracy: 94.8, cases: 320 },
    { disease: 'AMD', accuracy: 93.2, cases: 280 },
    { disease: 'Hypertensive Retinopathy', accuracy: 91.7, cases: 150 },
    { disease: 'Normal', accuracy: 97.8, cases: 800 }
  ];

  const confidenceDistribution = [
    { range: '90-100%', count: 1245, color: '#22c55e' },
    { range: '80-89%', count: 340, color: '#3b82f6' },
    { range: '70-79%', count: 125, color: '#f59e0b' },
    { range: '60-69%', count: 45, color: '#ef4444' }
  ];

  const weeklyTrends = [
    { day: 'Mon', scans: 45, accuracy: 94.2 },
    { day: 'Tue', scans: 52, accuracy: 95.1 },
    { day: 'Wed', scans: 48, accuracy: 93.8 },
    { day: 'Thu', scans: 65, accuracy: 94.7 },
    { day: 'Fri', scans: 58, accuracy: 95.3 },
    { day: 'Sat', scans: 32, accuracy: 93.9 },
    { day: 'Sun', scans: 28, accuracy: 94.5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Results & Analytics</h1>
          <p className="text-gray-600">Comprehensive performance metrics and diagnostic insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Overall Accuracy</p>
                <p className="text-3xl font-bold">95.1%</p>
                <p className="text-red-100 text-sm mt-1">+1.3% this month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Sensitivity</p>
                <p className="text-3xl font-bold">93.2%</p>
                <p className="text-green-100 text-sm mt-1">True positive rate</p>
              </div>
              <Eye className="h-8 w-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Specificity</p>
                <p className="text-3xl font-bold">96.8%</p>
                <p className="text-purple-100 text-sm mt-1">True negative rate</p>
              </div>
              <Users className="h-8 w-8 text-purple-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Cases Processed</p>
                <p className="text-3xl font-bold">2,000</p>
                <p className="text-orange-100 text-sm mt-1">This month</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="accuracy" stroke="#ef4444" strokeWidth={2} name="Accuracy" />
                <Line type="monotone" dataKey="sensitivity" stroke="#10b981" strokeWidth={2} name="Sensitivity" />
                <Line type="monotone" dataKey="specificity" stroke="#8b5cf6" strokeWidth={2} name="Specificity" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confidence Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={confidenceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="count"
                  label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(1)}%`}
                >
                  {confidenceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Disease-Specific Accuracy</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={diseaseAccuracy} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[85, 100]} />
                <YAxis dataKey="disease" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="accuracy" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="scans" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminResults;
