
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Brain, Zap, Shield, Target, Users, BarChart3, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced deep learning models including ResNet18 and DeiT Small for accurate retinal disease detection.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive analysis results in seconds with detailed confidence scores and recommendations.',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform ensuring your medical data remains secure and private.',
      color: 'bg-green-500'
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Validated on EyePACS dataset with over 96% accuracy in detecting various retinal conditions.',
      color: 'bg-red-500'
    }
  ];

  const conditions = [
    'Diabetic Retinopathy',
    'Macular Degeneration',
    'Glaucoma',
    'Retinal Detachment',
    'Hypertensive Retinopathy',
    'Macular Edema'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-2 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RetinalAI</h1>
                <p className="text-xs text-gray-500">AI-Powered Retinal Analysis</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionary AI for <span className="text-blue-600">Retinal Health</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Early detection of retinal diseases using advanced deep learning technology. 
            Upload fundus images and receive instant, accurate analysis powered by ResNet18 and DeiT Small models.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Start Free Analysis</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge deep learning models with intuitive design 
              to provide accurate, fast, and reliable retinal disease detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className={`${feature.color} p-4 rounded-full w-16 h-16 mx-auto mb-4`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Detectable Conditions</h2>
              <p className="text-gray-600 mb-8">
                Our AI system can accurately identify and analyze various retinal conditions, 
                helping with early diagnosis and treatment planning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="bg-blue-600 p-6 rounded-full w-24 h-24 mx-auto mb-6">
                  <Eye className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">96.1% Accuracy</h3>
                <p className="text-gray-600">
                  Validated on the EyePACS dataset with ensemble model achieving 
                  state-of-the-art performance in retinal disease detection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of healthcare professionals using RetinalAI for accurate retinal disease detection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Create Account
            </Link>
            <Link 
              to="/login" 
              className="border border-blue-400 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">RetinalAI</h3>
                  <p className="text-gray-400 text-sm">AI-Powered Retinal Analysis</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing retinal disease diagnosis through advanced artificial intelligence 
                and deep learning technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Analysis</li>
                <li>Instant Results</li>
                <li>Medical Reports</li>
                <li>Data Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RetinalAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
