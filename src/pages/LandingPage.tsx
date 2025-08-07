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
    { name: 'About', id: 'about', icon: Users },
    { name: 'Features', id: 'features', icon: Zap },
    { name: 'Education', id: 'education', icon: BookOpen },
    { name: 'Contact', id: 'contact', icon: Phone },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Dual AI Architecture',
      description: 'ResNet18 + DeiT Small ensemble model for superior accuracy in retinal disease detection.',
      theme: 'medical',
      metrics: '96% accuracy'
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

  const primaryConditions = [
    {
      title: 'Choroidal Neovascularization (CNV)',
      description: 'Abnormal blood vessel growth beneath the retina, commonly associated with wet AMD.',
      severity: 'Critical',
      prevalence: '10-15% of AMD patients',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800',
      symptoms: ['Sudden vision loss', 'Distorted vision', 'Central scotoma', 'Metamorphopsia'],
      prevention: ['Regular monitoring', 'Anti-VEGF therapy', 'Early detection', 'Amsler grid testing'],
      stages: ['Subfoveal CNV', 'Juxtafoveal CNV', 'Extrafoveal CNV', 'Occult CNV']
    },
    {
      title: 'Diabetic Macular Edema (DME)',
      description: 'Fluid accumulation in the macula due to diabetes, causing central vision impairment.',
      severity: 'High',
      prevalence: '7% of diabetic patients',
      icon: Eye,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-950/20',
      borderColor: 'border-orange-200 dark:border-orange-800',
      symptoms: ['Blurred central vision', 'Color changes', 'Reading difficulty', 'Wavy lines'],
      prevention: ['Blood sugar control', 'Regular eye exams', 'Blood pressure management', 'Lipid control'],
      stages: ['Mild DME', 'Moderate DME', 'Severe DME', 'Center-involving DME']
    },
    {
      title: 'Drusen',
      description: 'Yellow deposits under the retina, early sign of age-related macular degeneration.',
      severity: 'Moderate',
      prevalence: '30% of adults over 75',
      icon: Target,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      symptoms: ['Usually asymptomatic', 'Gradual vision changes', 'Difficulty in low light', 'Mild central blur'],
      prevention: ['Regular monitoring', 'Healthy diet', 'UV protection', 'Antioxidant supplements'],
      stages: ['Small drusen (<63μm)', 'Medium drusen (63-124μm)', 'Large drusen (>125μm)', 'Confluent drusen']
    },
    {
      title: 'Normal (Healthy Retina)',
      description: 'Healthy retinal tissue with normal blood vessels, macula, and optic nerve appearance.',
      severity: 'None',
      prevalence: 'Baseline standard',
      icon: Heart,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950/20',
      borderColor: 'border-green-200 dark:border-green-800',
      symptoms: ['Clear vision', 'No distortion', 'Normal color perception', 'Comfortable vision'],
      prevention: ['Annual eye exams', 'Healthy lifestyle', 'UV protection', 'Screen time management'],
      stages: ['Optimal health', 'Age-appropriate changes', 'Preventive monitoring', 'Baseline documentation']
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
            <div className="text-center mb-16 animate-fade-in">
              <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20 animate-scale-in">
                <Activity className="h-4 w-4 mr-2" />
                AI-Powered Medical Diagnosis
              </Badge>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground dark:text-white mb-8 leading-tight animate-fade-in">
                Revolutionizing <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Retinal Healthcare
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
                Advanced AI-powered retinal disease detection using cutting-edge deep learning. 
                Real-time camera scanning with <span className="text-primary font-semibold">96.1% accuracy</span> 
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
                  onClick={() => setActiveTab('education')}
                >
                  Learn More
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              {/* Statistics */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-scale-in hover-scale">
                    <div className="flex justify-center mb-2">
                      <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-full">
                        <stat.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-foreground dark:text-white">{stat.value}</div>
                    <div className="text-sm text-muted-foreground dark:text-slate-300 font-medium">{stat.label}</div>
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
            {/* About Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  About Reti-Doc
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                  Reti-Doc is a revolutionary AI-powered medical diagnostic platform specifically designed 
                  for retinal disease detection and prevention. Our cutting-edge technology combines advanced 
                  machine learning algorithms with medical expertise to provide accurate, fast, and accessible 
                  eye health screening.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                <Card className="bg-card/80 backdrop-blur border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      To democratize eye health screening and make early detection of retinal diseases 
                      accessible to everyone, regardless of geographical or economic barriers.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/80 backdrop-blur border-accent/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-foreground">Our Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      A world where preventable vision loss is eliminated through AI-powered early 
                      detection and comprehensive eye health education.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-card/80 backdrop-blur border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">Our Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Empowering healthcare providers and patients with accurate diagnostic tools 
                      and educational resources for better eye health outcomes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

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
                {primaryConditions.map((condition, index) => (
                  <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${condition.bgColor} border-2 ${condition.borderColor}`}>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`${condition.bgColor} p-3 rounded-2xl border ${condition.borderColor}`}>
                          <condition.icon className={`h-8 w-8 ${condition.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">{condition.title}</CardTitle>
                          <Badge variant="outline" className={`${condition.color} border-current`}>
                            {condition.severity} {condition.severity !== 'None' ? 'Risk' : ''}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{condition.description}</p>
                      
                      {/* Symptoms */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {condition.title.includes('Normal') ? 'Characteristics:' : 'Symptoms:'}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {condition.symptoms.map((symptom, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Prevention */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {condition.title.includes('Normal') ? 'Maintenance:' : 'Prevention:'}
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {condition.prevention.map((tip, i) => (
                            <li key={i} className="flex items-center">
                              <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          <strong>Prevalence:</strong> {condition.prevalence}
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          Ask AI Assistant
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

        {/* Remove scan and training tabs - they're now in user/admin dashboards */}

        {/* Educational AI Assistant */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsChatBotOpen(!isChatBotOpen)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          
          {isChatBotOpen && (
            <div className="absolute bottom-20 right-0 w-96 h-[500px] bg-background border border-border rounded-lg shadow-2xl animate-scale-in">
              <div className="p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <h3 className="font-semibold">Reti-Doc AI Assistant</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsChatBotOpen(false)}
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-primary-foreground/80 mt-1">
                  Ask about retinal diseases, symptoms, and prevention
                </p>
              </div>
              <div className="h-[400px]">
                <ChatBot />
              </div>
            </div>
          )}
        </div>

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