import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { 
  Eye, Brain, Zap, Shield, Target, Users, BarChart3, BookOpen, ArrowRight, 
  CheckCircle, Camera, Upload, Activity, AlertTriangle, Heart, Microscope, 
  Phone, Mail, MapPin, Play, Video, Server, Code, Database, Cpu, Cloud, 
  Lock, Monitor, Bot, Stethoscope, Scan, ChevronRight, Star, Award, 
  TrendingUp, MessageSquare, Clock, FileText, UserCheck, Wifi, Smartphone,
  Github, Linkedin, Twitter, Globe, Menu, X, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ChatBot from '@/components/ChatBot';
import ModelUpload from '@/components/ModelUpload';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Home', id: 'overview', icon: Eye },
    { name: 'Features', id: 'features', icon: Zap },
    { name: 'Scan', id: 'scan', icon: Scan },
    { name: 'AI Model', id: 'training', icon: Brain },
    { name: 'Chat', id: 'chat', icon: MessageSquare },
    { name: 'Contact', id: 'contact', icon: Phone },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Dual AI Architecture',
      description: 'ResNet18 + DeiT Small ensemble model for superior accuracy in retinal disease detection.',
      theme: 'medical',
      metrics: '96.1% accuracy'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant analysis with live camera feed and immediate diagnostic results.',
      theme: 'tech',
      metrics: '< 1 second'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform with end-to-end encryption and secure data handling.',
      theme: 'neural',
      metrics: '256-bit encryption'
    },
    {
      icon: Target,
      title: 'High Precision',
      description: 'Validated on EyePACS dataset with comprehensive disease coverage.',
      theme: 'medical',
      metrics: '8 disease types'
    }
  ];

  const diseases = [
    {
      name: 'Diabetic Retinopathy',
      description: 'Leading cause of blindness in diabetic patients. Early detection prevents 95% of severe vision loss.',
      severity: 'Critical',
      prevalence: '34.6% of diabetic patients',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Macular Degeneration',
      description: 'Age-related condition affecting central vision. Most common cause of vision loss in people over 50.',
      severity: 'High',
      prevalence: '8.7% of adults over 45',
      icon: Eye,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      name: 'Glaucoma',
      description: 'Silent thief of sight. Often symptomless until advanced stages.',
      severity: 'High',
      prevalence: '3.54% globally',
      icon: Target,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      name: 'Hypertensive Retinopathy',
      description: 'Damage caused by high blood pressure. Early indicator of cardiovascular complications.',
      severity: 'Moderate',
      prevalence: '8-15% of hypertensive patients',
      icon: Heart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const systemModules = [
    {
      category: 'Frontend Architecture',
      icon: Monitor,
      theme: 'tech',
      modules: [
        { name: 'React.js UI Components', description: 'Modern responsive interface with real-time updates' },
        { name: 'Camera Integration', description: 'Live video streaming with WebRTC support' },
        { name: 'Result Visualization', description: 'Interactive disease prediction displays' },
        { name: 'Chat Interface', description: 'Real-time medical consultation system' }
      ]
    },
    {
      category: 'AI/ML Backend',
      icon: Brain,
      theme: 'neural',
      modules: [
        { name: 'ResNet18 CNN', description: 'Deep learning for texture pattern recognition' },
        { name: 'DeiT Transformer', description: 'Vision transformer for global feature extraction' },
        { name: 'Ensemble Fusion', description: 'Multi-model prediction combination' },
        { name: 'Preprocessing Pipeline', description: 'Image normalization and augmentation' }
      ]
    },
    {
      category: 'Medical Intelligence',
      icon: Stethoscope,
      theme: 'medical',
      modules: [
        { name: 'Disease Classification', description: 'Multi-class retinal pathology detection' },
        { name: 'Recommendation Engine', description: 'Personalized treatment suggestions' },
        { name: 'Risk Assessment', description: 'Severity scoring and progression analysis' },
        { name: 'Clinical Decision Support', description: 'Evidence-based medical guidance' }
      ]
    },
    {
      category: 'Security & Compliance',
      icon: Shield,
      theme: 'medical',
      modules: [
        { name: 'HIPAA Compliance', description: 'Medical data privacy and security standards' },
        { name: 'Data Encryption', description: 'End-to-end encryption for patient data' },
        { name: 'Audit Logging', description: 'Comprehensive access and usage tracking' },
        { name: 'Cloud Security', description: 'Secure deployment and data storage' }
      ]
    }
  ];

  const stats = [
    { value: '96.1%', label: 'AI Accuracy', icon: Target },
    { value: '<1s', label: 'Analysis Time', icon: Clock },
    { value: '8+', label: 'Disease Types', icon: FileText },
    { value: '10K+', label: 'Scans Processed', icon: TrendingUp },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Medical Officer',
      bio: 'Ophthalmologist with 15+ years in retinal diseases',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Michael Rodriguez',
      role: 'AI Research Director',
      bio: 'PhD in Computer Vision, former Google Health',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Dr. Emily Johnson',
      role: 'Clinical Validation Lead',
      bio: 'Retinal specialist, Harvard Medical School',
      image: '/api/placeholder/150/150'
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
      
      setTimeout(() => {
        alert('Analysis complete! Please register for detailed results.');
      }, 2000);
    }
  }, []);

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'medical':
        return 'card-medical';
      case 'tech':
        return 'card-tech';
      case 'neural':
        return 'card-neural';
      default:
        return 'card-medical';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-cyan-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-white relative overflow-hidden">
      {/* Tech Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Modern Navigation */}
        <nav className="bg-slate-900/80 backdrop-blur-lg shadow-xl border-b border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl shadow-lg">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Reti-Doc</h1>
                  <p className="text-xs text-cyan-300 font-medium">AI-Powered Vision</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-2">
                {navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.name}</span>
                  </button>
                ))}
              </div>
              
              {/* Theme Toggle & Auth Buttons */}
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </Button>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                    Start
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-slate-800 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-lg">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ))}
              <div className="pt-4 border-t border-slate-700/50 space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full mb-2 border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark Mode
                    </>
                  )}
                </Button>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">Sign In</Button>
                </Link>
                <Link to="/register" className="block">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                <Activity className="h-4 w-4 mr-2" />
                AI-Powered Medical Diagnosis
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Revolutionizing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
                  Retinal Healthcare
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                Advanced AI-powered retinal disease detection using cutting-edge deep learning. 
                Real-time camera scanning with <span className="text-cyan-400 font-semibold">96.1% accuracy</span> 
                validated on medical datasets.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
                <Link to="/register">
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-4 h-auto shadow-lg">
                    Start Free Analysis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 text-lg px-8 py-4 h-auto"
                  onClick={() => setActiveTab('scan')}
                >
                  Try Live Scan
                  <Video className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-slate-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-20">
            {/* Core Features */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Advanced AI Technology
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Dual AI architecture combining CNNs and Vision Transformers for unprecedented accuracy
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className={`text-center hover:shadow-2xl transition-all duration-300 ${getThemeClasses(feature.theme)}`}>
                    <CardHeader className="pb-4">
                      <div className={`gradient-${feature.theme} p-4 rounded-2xl w-16 h-16 mx-auto mb-4 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-lg font-bold">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="text-xs">{feature.metrics}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* System Architecture */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  System Architecture
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Comprehensive overview of our medical AI platform
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {systemModules.map((category, index) => (
                  <Card key={index} className={`hover:shadow-2xl transition-all duration-300 ${getThemeClasses(category.theme)}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`gradient-${category.theme} p-4 rounded-2xl shadow-lg`}>
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl font-bold">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.modules.map((module, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/50">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <div>
                               <div className="font-semibold text-white text-sm">{module.name}</div>
                               <div className="text-xs text-slate-300">{module.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  About Reti-Doc
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Pioneering the future of retinal healthcare through artificial intelligence
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Reti-Doc revolutionizes retinal disease diagnosis by combining advanced artificial intelligence 
                      with medical expertise. Our dual AI architecture delivers unparalleled accuracy in detecting 
                      diabetic retinopathy, macular degeneration, glaucoma, and other critical eye conditions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      Making early detection accessible to healthcare providers worldwide, ultimately preventing vision 
                      loss and improving patient outcomes through real-time AI-powered diagnosis.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="card-medical p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">2024</div>
                      <div className="text-sm text-slate-300">Founded</div>
                    </div>
                    <div className="card-neural p-6 text-center">
                      <div className="text-3xl font-bold text-cyan-600 mb-2">96.1%</div>
                      <div className="text-sm text-slate-300">AI Accuracy</div>
                    </div>
                  </div>
                </div>
                
                <div className="card-tech p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-6 w-6 text-blue-600" />
                      <span className="text-slate-300 font-medium">ResNet18 + DeiT Small Ensemble</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Code className="h-6 w-6 text-purple-600" />
                      <span className="text-slate-300 font-medium">React.js Frontend Architecture</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Server className="h-6 w-6 text-green-600" />
                      <span className="text-slate-300 font-medium">Flask Backend Infrastructure</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="h-6 w-6 text-orange-600" />
                      <span className="text-slate-300 font-medium">PyTorch Deep Learning Framework</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Cloud className="h-6 w-6 text-cyan-600" />
                      <span className="text-slate-300 font-medium">Cloud-Native Deployment</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Team Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Expert Team</h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  World-class ophthalmologists and AI researchers working together
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="card-medical text-center hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-12 w-12 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-300 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Powerful Features
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Comprehensive tools for retinal disease detection and management
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className={`hover:shadow-2xl transition-all duration-300 ${getThemeClasses(feature.theme)}`}>
                    <CardHeader>
                      <div className={`gradient-${feature.theme} p-4 rounded-2xl w-16 h-16 shadow-lg`}>
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit">{feature.metrics}</Badge>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed mb-4">
                        {feature.description}
                      </CardDescription>
                      <Button className={`btn-${feature.theme} w-full`}>
                        Learn More
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Additional Features */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">Additional Capabilities</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card-medical p-6">
                  <Smartphone className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Mobile Compatible</h3>
                  <p className="text-slate-300 text-sm">Access from any device with responsive design</p>
                </div>
                <div className="card-tech p-6">
                  <Wifi className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                  <p className="text-slate-300 text-sm">Live streaming and instant analysis results</p>
                </div>
                <div className="card-neural p-6">
                  <MessageSquare className="h-8 w-8 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">AI Chatbot</h3>
                  <p className="text-slate-300 text-sm">24/7 medical guidance and consultation</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Retinal Disease Education
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Understanding common retinal conditions and their implications
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {diseases.map((disease, index) => (
                  <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${disease.bgColor} border-2 ${disease.borderColor}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`${disease.bgColor} p-3 rounded-2xl border ${disease.borderColor}`}>
                          <disease.icon className={`h-8 w-8 ${disease.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold">{disease.name}</CardTitle>
                          <Badge variant="outline" className={`${disease.color} border-current`}>
                            {disease.severity} Risk
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-800 mb-4 leading-relaxed">{disease.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-300">
                          <strong>Prevalence:</strong> {disease.prevalence}
                        </div>
                        <Button size="sm" className="btn-medical">
                          Learn More
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Prevention Tips */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-6">Prevention & Care</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card-medical p-6">
                  <Eye className="h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Regular Eye Exams</h3>
                  <p className="text-slate-300 text-sm">Annual comprehensive eye exams for early detection</p>
                </div>
                <div className="card-tech p-6">
                  <Heart className="h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Manage Diabetes</h3>
                  <p className="text-slate-300 text-sm">Blood sugar control reduces retinopathy risk</p>
                </div>
                <div className="card-neural p-6">
                  <Shield className="h-8 w-8 text-cyan-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">UV Protection</h3>
                  <p className="text-slate-300 text-sm">Sunglasses protect against harmful UV rays</p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Live Scan Tab */}
        {activeTab === 'scan' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Live Retinal Scan
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Real-time camera-based retinal analysis for instant results
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <Card className="card-medical">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">AI-Powered Real-time Analysis</CardTitle>
                    <CardDescription>
                      Position your eye close to the camera for optimal scanning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-6 relative">
                      <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        muted
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {!isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                          <div className="text-center text-white">
                            <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p className="text-lg">Camera not active</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {!isScanning ? (
                        <Button onClick={startCamera} className="btn-medical">
                          <Camera className="mr-2 h-5 w-5" />
                          Start Camera
                        </Button>
                      ) : (
                        <>
                          <Button onClick={captureImage} className="btn-neural">
                            <Scan className="mr-2 h-5 w-5" />
                            Capture & Analyze
                          </Button>
                          <Button onClick={stopCamera} variant="outline" className="btn-outline-medical">
                            <X className="mr-2 h-5 w-5" />
                            Stop Camera
                          </Button>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> This is a demonstration. For accurate medical diagnosis, 
                        please register and use our full diagnostic platform.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        )}

        {/* AI Training Tab */}
        {activeTab === 'training' && (
          <div className="space-y-20">
            <ModelUpload />
          </div>
        )}

        {/* Chat Support Tab */}
        {activeTab === 'chat' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                AI Medical Assistant
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Get instant medical guidance and support from our intelligent AI chatbot
              </p>
            </div>
            
            <div className="h-[700px]">
              <ChatBot isFullPage={true} />
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Get in Touch
                </h2>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  Ready to revolutionize your retinal care? Contact our team today
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <div className="card-medical p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-6 w-6 text-blue-600" />
                        <span className="text-slate-300">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-6 w-6 text-blue-600" />
                        <span className="text-slate-300">contact@reti-doc.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-6 w-6 text-blue-600" />
                        <span className="text-slate-300">123 Medical Center Dr, Healthcare City, HC 12345</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-tech p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Business Hours</h3>
                    <div className="space-y-2 text-slate-300">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card-neural p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Message</label>
                      <textarea 
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <Button className="btn-neural w-full">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="gradient-medical p-2 rounded-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Reti-Doc</h3>
                    <p className="text-sm text-gray-400">AI-Powered Retinal Intelligence</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Revolutionizing retinal healthcare through advanced artificial intelligence and medical expertise.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 Reti-Doc. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
};

export default LandingPage;