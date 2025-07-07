
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Upload, Users, BarChart3, BookOpen, Settings, Eye } from 'lucide-react';

const Navigation = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/analysis', icon: Upload, label: 'Image Analysis' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/results', icon: BarChart3, label: 'Results' },
    { path: '/education', icon: BookOpen, label: 'Education' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">RetinalAI</h1>
              <p className="text-xs text-gray-500">Diagnostic System</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
