import React from 'react';
import { Book, Play, FileText, ExternalLink, Eye, AlertTriangle, Heart, Zap, Users, Calendar } from 'lucide-react';

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

  const preventionTips = [
    {
      icon: Calendar,
      title: 'Regular Eye Exams',
      description: 'Early detection is key to preventing vision loss',
      tips: ['Annual comprehensive eye exams', 'More frequent if you have risk factors', 'Don\'t skip appointments']
    },
    {
      icon: Heart,
      title: 'Manage Health Conditions',
      description: 'Control underlying health issues',
      tips: ['Keep diabetes under control', 'Manage blood pressure', 'Maintain healthy cholesterol levels']
    },
    {
      icon: Users,
      title: 'Healthy Lifestyle',
      description: 'Simple changes can protect your vision',
      tips: ['Eat a balanced diet rich in omega-3s', 'Exercise regularly', 'Don\'t smoke']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eye Health Education</h1>
          <p className="text-gray-600">Learn about retinal diseases and how to maintain healthy vision</p>
        </div>

        {/* Featured Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">About Our AI Technology</h2>
            <p className="text-blue-100 mb-6">
              Our advanced AI system uses state-of-the-art deep learning models including ResNet18 and DeiT Small (Vision Transformer) 
              to analyze retinal images with medical-grade accuracy. The system can detect early signs of retinal diseases that might 
              be missed by the human eye.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">96.1%</p>
                <p className="text-sm text-blue-200">Overall Accuracy</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">&lt;1s</p>
                <p className="text-sm text-blue-200">Analysis Time</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-blue-200">Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Prevention & Early Detection</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {preventionTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <tip.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{tip.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                <ul className="space-y-2">
                  {tip.tips.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disease Information */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Common Retinal Conditions</h2>
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
                    <h4 className="font-medium text-gray-800 mb-2">Warning Signs</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Risk Factors</h4>
                    <div className="flex flex-wrap gap-1">
                      {disease.riskFactors.slice(0, 2).map((factor, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Take Control of Your Eye Health</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Early detection can prevent vision loss. Use our AI-powered analysis tool to screen for retinal diseases 
            and consult with healthcare professionals for comprehensive care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Start Analysis
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Find Eye Care Professional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
