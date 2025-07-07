
import React from 'react';
import { Book, Play, FileText, ExternalLink, Eye, AlertTriangle, Heart, Zap } from 'lucide-react';

const Education = () => {
  const diseases = [
    {
      name: 'Diabetic Retinopathy',
      icon: Heart,
      color: 'bg-red-500',
      description: 'A diabetes complication that affects eyes, caused by damage to blood vessels of the retina.',
      symptoms: ['Blurred vision', 'Floaters', 'Dark areas in vision', 'Vision loss'],
      riskFactors: ['Diabetes duration', 'Poor blood sugar control', 'High blood pressure', 'Pregnancy'],
      stages: ['Mild', 'Moderate', 'Severe', 'Proliferative']
    },
    {
      name: 'Glaucoma',
      icon: Eye,
      color: 'bg-blue-500',
      description: 'A group of eye conditions that damage the optic nerve, often due to high eye pressure.',
      symptoms: ['Gradual vision loss', 'Tunnel vision', 'Eye pain', 'Halos around lights'],
      riskFactors: ['Age over 60', 'Family history', 'High eye pressure', 'Thin corneas'],
      stages: ['Early', 'Moderate', 'Advanced', 'End-stage']
    },
    {
      name: 'Age-related Macular Degeneration',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      description: 'An eye disease that can blur central vision due to damage to the macula.',
      symptoms: ['Central vision loss', 'Straight lines appear wavy', 'Difficulty recognizing faces', 'Need for brighter light'],
      riskFactors: ['Age over 50', 'Smoking', 'Family history', 'Race (more common in Caucasians)'],
      stages: ['Early', 'Intermediate', 'Late dry', 'Late wet']
    }
  ];

  const resources = [
    { title: 'Fundus Photography Basics', type: 'video', duration: '15 min', icon: Play },
    { title: 'AI in Ophthalmology Guide', type: 'document', pages: '24 pages', icon: FileText },
    { title: 'Retinal Disease Atlas', type: 'reference', items: '150+ images', icon: Book },
    { title: 'Latest Research Papers', type: 'external', count: '25 papers', icon: ExternalLink }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Resources</h1>
          <p className="text-gray-600">Learn about retinal diseases, diagnostic techniques, and AI-assisted screening</p>
        </div>

        {/* Disease Information Cards */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Common Retinal Diseases</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {diseases.map((disease, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className={`${disease.color} p-4`}>
                  <div className="flex items-center space-x-3">
                    <disease.icon className="h-6 w-6 text-white" />
                    <h3 className="text-lg font-semibold text-white">{disease.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">{disease.description}</p>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Common Symptoms</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {disease.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Risk Factors</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {disease.riskFactors.map((factor, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Disease Stages</h4>
                    <div className="flex flex-wrap gap-2">
                      {disease.stages.map((stage, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {stage}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <resource.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600">
                  {resource.duration || resource.pages || resource.items || resource.count}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">AI Model Architecture</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-blue-600 mr-2" />
                ResNet18 Architecture
              </h3>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-3">
                  Convolutional Neural Network designed for image classification with residual connections.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 18 layers deep with skip connections</li>
                  <li>• Effective for feature extraction from fundus images</li>
                  <li>• Fast inference time (~0.3 seconds)</li>
                  <li>• 92.5% accuracy on retinal disease detection</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Eye className="h-5 w-5 text-purple-600 mr-2" />
                DeiT Small (Vision Transformer)
              </h3>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 mb-3">
                  Data-efficient Image Transformer for processing fundus images with attention mechanisms.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Transformer-based architecture with self-attention</li>
                  <li>• Better at capturing global image patterns</li>
                  <li>• Moderate inference time (~0.5 seconds)</li>
                  <li>• 94.2% accuracy with improved generalization</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ensemble Approach</h3>
            <p className="text-sm text-gray-700 mb-3">
              Our system combines both ResNet18 and DeiT Small models to achieve optimal performance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-green-600">96.1%</p>
                <p className="text-sm text-gray-600">Combined Accuracy</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">0.8s</p>
                <p className="text-sm text-gray-600">Processing Time</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">98.5%</p>
                <p className="text-sm text-gray-600">Confidence Score</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
