
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Brain, Zap, Shield, Target, Users, BarChart3, BookOpen, ArrowRight, CheckCircle, Camera, Upload, Activity, AlertTriangle, Heart, Microscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced deep learning models including ResNet18 and DeiT Small for accurate retinal disease detection with 96.1% accuracy.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get comprehensive analysis results in seconds with detailed confidence scores and treatment recommendations.',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform ensuring your medical data remains secure and private with end-to-end encryption.',
      color: 'bg-green-500'
    },
    {
      icon: Target,
      title: 'High Precision',
      description: 'Validated on EyePACS dataset with ensemble model achieving state-of-the-art performance in disease detection.',
      color: 'bg-red-500'
    }
  ];

  const diseases = [
    {
      name: 'Diabetic Retinopathy',
      description: 'Leading cause of blindness in diabetic patients. Early detection prevents 95% of severe vision loss.',
      severity: 'High Risk',
      prevalence: '34.6% of diabetic patients',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      name: 'Macular Degeneration',
      description: 'Age-related condition affecting central vision. Most common cause of vision loss in people over 50.',
      severity: 'Moderate Risk',
      prevalence: '8.7% of adults over 45',
      icon: Eye,
      color: 'text-orange-600'
    },
    {
      name: 'Glaucoma',
      description: 'Silent thief of sight. Often symptomless until advanced stages, affecting peripheral vision first.',
      severity: 'High Risk',
      prevalence: '3.54% globally',
      icon: Target,
      color: 'text-yellow-600'
    },
    {
      name: 'Hypertensive Retinopathy',
      description: 'Damage caused by high blood pressure. Early indicator of cardiovascular complications.',
      severity: 'Moderate Risk',
      prevalence: '8-15% of hypertensive patients',
      icon: Heart,
      color: 'text-blue-600'
    }
  ];

  const scanningSteps = [
    {
      step: 1,
      title: 'Image Capture',
      description: 'High-resolution fundus photography using specialized retinal cameras',
      icon: Camera
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'Deep learning models analyze retinal structures and identify abnormalities',
      icon: Brain
    },
    {
      step: 3,
      title: 'Result Generation',
      description: 'Comprehensive report with diagnosis, confidence scores, and recommendations',
      icon: BarChart3
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-50">
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
            
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`text-sm font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`text-sm font-medium transition-colors ${activeTab === 'education' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab('demo')}
                className={`text-sm font-medium transition-colors ${activeTab === 'demo' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Live Demo
              </button>
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
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
              <Activity className="h-4 w-4 mr-2" />
              Real-time AI Diagnosis
            </span>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Revolutionary AI for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Retinal Health</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Early detection of retinal diseases using advanced deep learning technology. 
            Upload fundus images and receive instant, accurate analysis powered by ResNet18 and DeiT Small models 
            with <strong>96.1% accuracy</strong> validated on EyePACS dataset.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/register">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => setActiveTab('demo')}>
              Try Live Demo
              <Camera className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">96.1%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">&lt;1s</div>
              <div className="text-sm text-gray-600">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">6+</div>
              <div className="text-sm text-gray-600">Disease Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">10K+</div>
              <div className="text-sm text-gray-600">Images Analyzed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced AI Technology</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our platform combines cutting-edge deep learning models with intuitive design 
                  to provide accurate, fast, and reliable retinal disease detection.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-gray-50 to-white">
                    <CardHeader>
                      <div className={`${feature.color} p-4 rounded-full w-16 h-16 mx-auto mb-4`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">How Real-Time Scanning Works</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our advanced AI pipeline processes retinal images through multiple stages for comprehensive analysis
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {scanningSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="bg-white p-6 rounded-full w-24 h-24 mx-auto shadow-lg border-4 border-blue-100">
                        <step.icon className="h-12 w-12 text-blue-600" />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'education' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Educational Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn about retinal diseases, their symptoms, and the importance of early detection
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {diseases.map((disease, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-3 rounded-lg">
                        <disease.icon className={`h-6 w-6 ${disease.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{disease.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            disease.severity === 'High Risk' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {disease.severity}
                          </span>
                          <span className="text-xs text-gray-500">{disease.prevalence}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{disease.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Educational Stats */}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Retinal Disease Impact</h3>
                <p className="text-blue-100">Understanding the global burden of retinal diseases</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">285M</div>
                  <div className="text-blue-100">People with vision impairment globally</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">80%</div>
                  <div className="text-blue-100">Of vision impairment is preventable</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">90%</div>
                  <div className="text-blue-100">Success rate with early detection</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'demo' && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Demo</h2>
              <p className="text-xl text-gray-600">
                Experience our AI-powered retinal analysis in real-time
              </p>
            </div>
            
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-12 rounded-2xl mb-6">
                  <Upload className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Fundus Image</h3>
                  <p className="text-gray-600 mb-6">
                    Drag and drop your retinal image or click to browse
                  </p>
                  <Button className="mb-4">
                    <Camera className="mr-2 h-4 w-4" />
                    Choose Image
                  </Button>
                  <p className="text-sm text-gray-500">
                    Supported formats: JPG, PNG, DICOM | Max size: 10MB
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Microscope className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium">Image Quality Check</div>
                    <div className="text-gray-600">Automated quality assessment</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-medium">AI Analysis</div>
                    <div className="text-gray-600">ResNet18 + DeiT processing</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-medium">Instant Results</div>
                    <div className="text-gray-600">Detailed diagnostic report</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  * Demo requires account registration for full functionality
                </p>
                <Link to="/register">
                  <Button size="lg">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Retinal Care?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of healthcare professionals using RetinalAI for accurate, instant retinal disease detection.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                Sign In
              </Button>
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
                and deep learning technology. Validated on EyePACS dataset with 96.1% accuracy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Real-time AI Analysis</li>
                <li>Instant Diagnosis</li>
                <li>Medical Reports</li>
                <li>Educational Resources</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Contact Support</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RetinalAI. All rights reserved. | Powered by ResNet18 & DeiT Small</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
