
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, Calendar, FileText, TrendingUp, Shield, Heart } from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();

  const recentScans = [
    { id: 1, date: '2024-01-15', result: 'Normal', confidence: 98.5, status: 'completed' },
    { id: 2, date: '2024-01-10', result: 'Requires Attention', confidence: 87.2, status: 'reviewed' },
    { id: 3, date: '2024-01-05', result: 'Normal', confidence: 95.8, status: 'completed' }
  ];

  const healthTips = [
    {
      icon: Eye,
      title: 'Regular Eye Exams',
      description: 'Schedule comprehensive eye exams annually, or as recommended by your eye care professional.',
      color: 'bg-blue-500'
    },
    {
      icon: Heart,
      title: 'Manage Diabetes',
      description: 'Keep blood sugar levels controlled to prevent diabetic retinopathy complications.',
      color: 'bg-red-500'
    },
    {
      icon: Shield,
      title: 'UV Protection',
      description: 'Wear sunglasses with UV protection to shield your eyes from harmful rays.',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Your retinal health dashboard and analysis tools</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Scans</p>
                <p className="text-2xl font-bold text-gray-900">{recentScans.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Scan</p>
                <p className="text-2xl font-bold text-gray-900">5 days</p>
                <p className="text-xs text-gray-500">ago</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Health Score</p>
                <p className="text-2xl font-bold text-green-600">Good</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reports</p>
                <p className="text-2xl font-bold text-gray-900">{recentScans.length}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Scans */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Scans</h3>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{scan.date}</p>
                    <p className={`text-sm ${
                      scan.result === 'Normal' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {scan.result}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Confidence</p>
                    <p className="font-semibold text-gray-800">{scan.confidence}%</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              View All Scans
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">New Analysis</p>
                  <p className="text-sm text-gray-600">Upload fundus image for analysis</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="bg-green-600 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Download Report</p>
                  <p className="text-sm text-gray-600">Get your latest scan report</p>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="bg-purple-600 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Schedule Checkup</p>
                  <p className="text-sm text-gray-600">Book your next appointment</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Eye Health Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className={`${tip.color} p-4 rounded-full w-16 h-16 mx-auto mb-4`}>
                  <tip.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
