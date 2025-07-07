
import React from 'react';
import ImageUpload from '../components/ImageUpload';
import { Brain, Zap, Shield, Target } from 'lucide-react';

const Analysis = () => {
  const modelSpecs = [
    { name: 'ResNet18', accuracy: '92.5%', speed: '0.3s', icon: Brain, color: 'bg-blue-500' },
    { name: 'DeiT Small', accuracy: '94.2%', speed: '0.5s', icon: Zap, color: 'bg-purple-500' },
    { name: 'Ensemble Model', accuracy: '96.1%', speed: '0.8s', icon: Shield, color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Analysis</h1>
          <p className="text-gray-600">Upload fundus images for automated retinal disease detection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <ImageUpload />
          </div>

          {/* Model Information Sidebar */}
          <div className="space-y-6">
            {/* AI Models */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Models</h3>
              <div className="space-y-4">
                {modelSpecs.map((model, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <div className={`${model.color} p-2 rounded-lg`}>
                      <model.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{model.name}</p>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>Accuracy: {model.accuracy}</span>
                        <span>Speed: {model.speed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">GPU Utilization</span>
                  <span className="text-sm font-medium text-green-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Memory Usage</span>
                  <span className="text-sm font-medium text-blue-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-600">System Health</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">Optimal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Processing Queue */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Queue</h3>
              <div className="text-center py-4">
                <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No images in queue</p>
                <p className="text-xs text-gray-400 mt-1">Ready for analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
