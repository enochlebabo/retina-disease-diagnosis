import React from 'react';
import ImageUpload from '../../components/ImageUpload';
import { Brain, Zap, Shield, Target, Info, Clock } from 'lucide-react';

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Retinal Analysis</h1>
          <p className="text-gray-600">Upload your fundus image for AI-powered retinal health analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2">
            <ImageUpload />
            
            {/* Information Panel */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">How it works</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload a clear fundus (retinal) photograph</li>
                    <li>• Our AI analyzes the image using advanced deep learning</li>
                    <li>• Receive instant results with confidence scores</li>
                    <li>• Download detailed reports for your records</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Models Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Technology</h3>
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

            {/* Analysis Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Status</h3>
              <div className="text-center py-4">
                <Target className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Ready for analysis</p>
                <p className="text-xs text-gray-400 mt-1">Upload an image to begin</p>
              </div>
            </div>

            {/* Processing Time */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Time</h3>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">~1 second</p>
                  <p className="text-sm text-gray-600">Average analysis time</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                Processing time may vary based on image size and system load.
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">Privacy Protected</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your images are processed securely and are not stored permanently on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
