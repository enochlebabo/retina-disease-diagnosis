import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart3, 
  Users, 
  Brain, 
  FileText, 
  Settings, 
  LogOut, 
  Stethoscope,
  Search,
  Calendar
} from 'lucide-react';

interface ClinicianLayoutProps {
  children: React.ReactNode;
}

const ClinicianLayout: React.FC<ClinicianLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/clinician/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/clinician/patients', icon: Users, label: 'Patient Cases' },
    { path: '/clinician/diagnosis', icon: Brain, label: 'AI Diagnosis' },
    { path: '/clinician/reports', icon: FileText, label: 'Reports' },
    { path: '/clinician/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/clinician/research', icon: Search, label: 'Research' },
    { path: '/clinician/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <nav className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RetinalAI Clinician</h1>
                <p className="text-xs text-gray-500">Advanced Diagnostic Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
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
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Dr. {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default ClinicianLayout;