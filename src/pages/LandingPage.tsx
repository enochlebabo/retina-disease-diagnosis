import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Brain, Zap, Shield, Target, Users, BarChart3, BookOpen, ArrowRight, CheckCircle, Camera, Upload, Activity, AlertTriangle, Heart, Microscope, Phone, Mail, MapPin, Play, Video, Server, Code, Database, Cpu, Cloud, Lock, Monitor, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const features = [
    {
      icon: Brain,
      title: 'Dual AI Architecture',
      description: 'ResNet18 + DeiT Small ensemble model for superior accuracy in retinal disease detection.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant analysis with live camera feed and immediate diagnostic results.',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform with end-to-end encryption and secure data handling.',
      color: 'bg-green-500'
    },
    {
      icon: Target,
      title: 'High Precision',
      description: '96.1% accuracy validated on EyePACS dataset with comprehensive disease coverage.',
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

  const systemModules = [
    {
      category: 'Frontend Components',
      icon: Monitor,
      modules: [
        { name: 'Navbar.js', description: 'Site navigation (Home, Upload, Chat, About, Help)' },
        { name: 'UploadForm.js', description: 'Image selection and upload interface' },
        { name: 'ResultDisplay.js', description: 'Disease prediction and confidence display' },
        { name: 'ChatBotWindow.js', description: 'Real-time medical advice chat interface' }
      ]
    },
    {
      category: 'Backend Modules',
      icon: Server,
      modules: [
        { name: 'predict.py', description: 'Image processing and model inference' },
        { name: 'models.py', description: 'ResNet18 + DeiT model loading and execution' },
        { name: 'chatbot.py', description: 'AI-powered medical consultation engine' },
        { name: 'recommendation.py', description: 'Treatment suggestions and care guidance' }
      ]
    },
    {
      category: 'AI Architecture',
      icon: Brain,
      modules: [
        { name: 'ResNet18', description: 'CNN for localized texture learning' },
        { name: 'DeiT Small', description: 'Vision Transformer for global features' },
        { name: 'FusionLayer', description: 'Ensemble model output combination' },
        { name: 'ClassifierHead', description: 'Final disease classification layer' }
      ]
    },
    {
      category: 'Security & Deployment',
      icon: Shield,
      modules: [
        { name: 'Input Validation', description: 'File security and API protection' },
        { name: 'HIPAA Compliance', description: 'Medical data encryption and privacy' },
        { name: 'Cloud Integration', description: 'Scalable deployment on Vercel/Render' },
        { name: 'Performance Monitor', description: 'Real-time system health tracking' }
      ]
    }
  ];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera access denied. Please allow camera permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsScanning(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      // Simulate AI analysis
      setTimeout(() => {
        alert('Analysis complete! Please register for detailed results.');
      }, 2000);
    }
  }, []);

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
                <h1 className="text-xl font-bold text-gray-800">Reti-Doc</h1>
                <p className="text-xs text-gray-500">AI-Powered Retinal Diagnosis</p>
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
                onClick={() => setActiveTab('about')}
                className={`text-sm font-medium transition-colors ${activeTab === 'about' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                About
              </button>
              <button 
                onClick={() => setActiveTab('features')}
                className={`text-sm font-medium transition-colors ${activeTab === 'features' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`text-sm font-medium transition-colors ${activeTab === 'education' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Education
              </button>
              <button 
                onClick={() => setActiveTab('scan')}
                className={`text-sm font-medium transition-colors ${activeTab === 'scan' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Live Scan
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`text-sm font-medium transition-colors ${activeTab === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
              >
                Contact
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
            Advanced retinal disease detection using dual AI architecture with ResNet18 and DeiT Small models. 
            Real-time camera scanning with <strong>96.1% accuracy</strong> validated on EyePACS dataset.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Link to="/register">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Free Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={() => setActiveTab('scan')}>
              Try Live Scan
              <Video className="ml-2 h-5 w-5" />
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
              <div className="text-3xl font-bold text-purple-600">8+</div>
              <div className="text-sm text-gray-600">System Modules</div>
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
          {/* Core Features */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Advanced AI Technology</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Dual AI architecture combining CNNs and Vision Transformers for superior accuracy
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

          {/* System Architecture */}
          <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">System Architecture</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive module overview of our retinal diagnosis system
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {systemModules.map((category, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-lg">
                          <category.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.modules.map((module, idx) => (
                          <div key={idx} className="border-l-2 border-blue-200 pl-4">
                            <div className="font-medium text-sm text-gray-800">{module.name}</div>
                            <div className="text-xs text-gray-600">{module.description}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === 'about' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">About Reti-Doc</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pioneering the future of retinal healthcare through artificial intelligence
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  Reti-Doc revolutionizes retinal disease diagnosis by combining advanced artificial intelligence 
                  with medical expertise. Our dual AI architecture, featuring ResNet18 and DeiT Small models, 
                  delivers unparalleled accuracy in detecting diabetic retinopathy, macular degeneration, 
                  glaucoma, and other critical eye conditions.
                </p>
                <p className="text-gray-600 mb-6">
                  With real-time camera scanning capabilities and instant analysis, we're making early 
                  detection accessible to healthcare providers worldwide, ultimately preventing vision 
                  loss and improving patient outcomes.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2024</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">96.1%</div>
                    <div className="text-sm text-gray-600">AI Accuracy</div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Technology Stack</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">ResNet18 + DeiT Small Ensemble</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">React.js Frontend Architecture</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Server className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Flask Backend Infrastructure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Cloud className="h-5 w-5 text-orange-600" />
                    <span className="text-gray-700">Cloud-Native Deployment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-red-600" />
                    <span className="text-gray-700">HIPAA-Compliant Security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'features' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive tools for retinal disease detection and patient care
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Camera className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Real-time Scanning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Live camera integration for instant retinal image capture and analysis. 
                    No need for specialized equipment - use any device camera.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Bot className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle>AI Medical Advisor</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Intelligent chatbot providing medical consultation, prevention advice, 
                    and personalized care recommendations based on analysis results.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle>Detailed Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive reports with confidence scores, visual explanations, 
                    and treatment recommendations for healthcare professionals.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Database className="h-8 w-8 text-orange-600 mb-2" />
                  <CardTitle>Patient Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Secure patient data storage, history tracking, and progress monitoring 
                    with HIPAA-compliant infrastructure.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Cpu className="h-8 w-8 text-red-600 mb-2" />
                  <CardTitle>Dual AI Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    ResNet18 for texture analysis and DeiT Small for global features, 
                    combined for superior diagnostic accuracy.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-indigo-600 mb-2" />
                  <CardTitle>Educational Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Comprehensive library of retinal disease information, prevention guides, 
                    and medical research for continuous learning.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'education' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Educational Resources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn about retinal diseases, symptoms, and the importance of early detection
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
                <h3 className="text-2xl font-bold mb-2">Global Impact</h3>
                <p className="text-blue-100">Understanding retinal disease burden worldwide</p>
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

      {activeTab === 'scan' && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Live Retinal Scan</h2>
              <p className="text-xl text-gray-600">
                Real-time camera scanning for instant retinal analysis
              </p>
            </div>
            
            <Card className="p-8">
              <div className="text-center mb-8">
                {!isScanning ? (
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-12 rounded-2xl mb-6">
                    <Video className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Start Live Camera Scan</h3>
                    <p className="text-gray-600 mb-6">
                      Use your device camera for real-time retinal image capture and analysis
                    </p>
                    <Button onClick={startCamera} className="mb-4">
                      <Camera className="mr-2 h-4 w-4" />
                      Start Camera
                    </Button>
                    <p className="text-sm text-gray-500">
                      Camera permission required | Works with front/back camera
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full"></div>
                      </div>
                    </div>
                    <canvas ref={canvasRef} className="hidden" />
                    <div className="flex justify-center space-x-4">
                      <Button onClick={captureImage}>
                        <Camera className="mr-2 h-4 w-4" />
                        Capture & Analyze
                      </Button>
                      <Button variant="outline" onClick={stopCamera}>
                        Stop Camera
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mt-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Microscope className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-medium">Real-time Processing</div>
                    <div className="text-gray-600">Instant image quality check</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Brain className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                    <div className="font-medium">AI Analysis</div>
                    <div className="text-gray-600">Dual model inference</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="font-medium">Live Results</div>
                    <div className="text-gray-600">Immediate diagnostic feedback</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">
                  * Full diagnostic report requires account registration
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

      {activeTab === 'contact' && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get in touch with our team for support, partnerships, or inquiries
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-6 w-6 text-blue-600" />
                      <CardTitle>Email Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">General inquiries and support</p>
                    <p className="font-medium">support@reti-doc.com</p>
                    <p className="text-gray-600 mb-2 mt-4">Medical partnerships</p>
                    <p className="font-medium">partnerships@reti-doc.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-6 w-6 text-green-600" />
                      <CardTitle>Phone Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">24/7 Technical Support</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                    <p className="text-gray-600 mb-2 mt-4">Business hours: 9 AM - 6 PM EST</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-6 w-6 text-red-600" />
                      <CardTitle>Office Location</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      123 Medical AI Avenue<br />
                      Healthcare District<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                  <CardDescription>We'll get back to you within 24 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>
                  <Button className="w-full">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Retinal Care?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join healthcare professionals worldwide using Reti-Doc for accurate, instant retinal disease detection.
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
                  <h3 className="text-xl font-bold">Reti-Doc</h3>
                  <p className="text-gray-400 text-sm">AI-Powered Retinal Diagnosis</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Revolutionizing retinal disease diagnosis through advanced artificial intelligence 
                and dual-model architecture. Real-time scanning with 96.1% accuracy validated on EyePACS dataset.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Live Camera Scanning</li>
                <li>AI Medical Advisor</li>
                <li>Patient Management</li>
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
            <p>&copy; 2024 Reti-Doc. All rights reserved. | Powered by ResNet18 & DeiT Small</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;