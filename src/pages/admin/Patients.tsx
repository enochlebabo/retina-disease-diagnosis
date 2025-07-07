import React from 'react';
import PatientCard from '../../components/PatientCard';
import { Search, Plus, Filter } from 'lucide-react';

const AdminPatients = () => {
  const patients = [
    { id: '1', name: 'John Smith', age: 65, lastVisit: '2024-01-15', condition: 'Diabetic Retinopathy', risk: 'High' as const },
    { id: '2', name: 'Mary Johnson', age: 58, lastVisit: '2024-01-14', condition: 'Glaucoma Suspect', risk: 'Medium' as const },
    { id: '3', name: 'Robert Brown', age: 72, lastVisit: '2024-01-13', condition: 'Normal', risk: 'Low' as const },
    { id: '4', name: 'Lisa Davis', age: 45, lastVisit: '2024-01-12', condition: 'AMD Early Stage', risk: 'Medium' as const },
    { id: '5', name: 'Michael Wilson', age: 68, lastVisit: '2024-01-11', condition: 'Diabetic Retinopathy', risk: 'High' as const },
    { id: '6', name: 'Sarah Miller', age: 52, lastVisit: '2024-01-10', condition: 'Normal', risk: 'Low' as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Management</h1>
          <p className="text-gray-600">Monitor and manage all patient records and screening results</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Plus className="h-4 w-4" />
              <span>Add Patient</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">High Risk</p>
            <p className="text-2xl font-bold text-red-600">{patients.filter(p => p.risk === 'High').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Medium Risk</p>
            <p className="text-2xl font-bold text-orange-600">{patients.filter(p => p.risk === 'Medium').length}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Low Risk</p>
            <p className="text-2xl font-bold text-green-600">{patients.filter(p => p.risk === 'Low').length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;
