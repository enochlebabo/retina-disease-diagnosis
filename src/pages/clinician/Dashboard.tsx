import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import StatsCard from '../../components/StatsCard';
import { Brain, Users, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, Eye } from 'lucide-react';

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total Cases Analyzed',
      value: '1,247',
      change: '+12.5%',
      icon: Brain,
      color: 'blue' as const,
      trend: 'up' as const
    },
    {
      title: 'Active Patients',
      value: '89',
      change: '+3.2%',
      icon: Users,
      color: 'green' as const,
      trend: 'up' as const
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '-5.1%',
      icon: Clock,
      color: 'orange' as const,
      trend: 'down' as const
    },
    {
      title: 'Diagnostic Accuracy',
      value: '94.7%',
      change: '+1.8%',
      icon: TrendingUp,
      color: 'blue' as const,
      trend: 'up' as const
    }
  ];

  const diagnosisData = [
    { name: 'CNV', cases: 145, accuracy: 96 },
    { name: 'DME', cases: 203, accuracy: 94 },
    { name: 'Drusen', cases: 312, accuracy: 92 },
    { name: 'Normal', cases: 587, accuracy: 97 }
  ];

  const severityData = [
    { name: 'High Risk', value: 156, color: '#ef4444' },
    { name: 'Medium Risk', value: 289, color: '#f59e0b' },
    { name: 'Low Risk', value: 802, color: '#10b981' }
  ];

  const weeklyTrends = [
    { day: 'Mon', cases: 45, accuracy: 94 },
    { day: 'Tue', cases: 52, accuracy: 96 },
    { day: 'Wed', cases: 48, accuracy: 93 },
    { day: 'Thu', cases: 61, accuracy: 95 },
    { day: 'Fri', cases: 55, accuracy: 97 },
    { day: 'Sat', cases: 38, accuracy: 94 },
    { day: 'Sun', cases: 32, accuracy: 92 }
  ];

  const recentActivity = [
    {
      id: 1,
      patient: 'Patient #1247',
      diagnosis: 'CNV detected',
      confidence: '96%',
      severity: 'High',
      time: '2 min ago',
      status: 'urgent'
    },
    {
      id: 2,
      patient: 'Patient #1246',
      diagnosis: 'Normal retina',
      confidence: '99%',
      severity: 'Low',
      time: '15 min ago',
      status: 'completed'
    },
    {
      id: 3,
      patient: 'Patient #1245',
      diagnosis: 'Drusen deposits',
      confidence: '87%',
      severity: 'Medium',
      time: '1 hour ago',
      status: 'review'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Clinician Dashboard</h1>
            <p className="text-blue-100">AI-Powered Retinal Diagnosis Platform</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Eye className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Diagnosis Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Diagnosis Distribution</h2>
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={diagnosisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Severity */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Risk Severity Distribution</h2>
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Weekly Analysis Trends</h2>
          <TrendingUp className="h-6 w-6 text-green-600" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Diagnostic Activity</h2>
          <Calendar className="h-6 w-6 text-purple-600" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  activity.status === 'urgent' ? 'bg-red-500' :
                  activity.status === 'completed' ? 'bg-green-500' :
                  'bg-orange-500'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900">{activity.patient}</h3>
                  <p className="text-sm text-gray-600">{activity.diagnosis}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">
                    Confidence: {activity.confidence}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.severity === 'High' ? 'bg-red-100 text-red-800' :
                    activity.severity === 'Medium' ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {activity.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;