
import React from 'react';
import { User, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
  risk: 'Low' | 'Medium' | 'High';
  avatar?: string;
}

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'High': return AlertTriangle;
      case 'Medium': return AlertTriangle;
      case 'Low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  const RiskIcon = getRiskIcon(patient.risk);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-2">
            <User className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">Age: {patient.age}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(patient.risk)}`}>
          <RiskIcon className="h-3 w-3" />
          <span>{patient.risk}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Last visit: {patient.lastVisit}</span>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700 mb-1">Current Condition</p>
          <p className="text-sm text-gray-600">{patient.condition}</p>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
