import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { 
  Eye, Brain, Zap, Shield, Target, Users, BookOpen, ArrowRight, 
  CheckCircle, Camera, Upload, Activity, Heart, Microscope, 
  Phone, Mail, MapPin, ChevronRight, Star, Award, 
  Github, Linkedin, Twitter, Menu, X, Sun, Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MedicalChatbot from '@/components/MedicalChatbot';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
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
      title: 'Advanced AI Analysis',
      description: 'Cutting-edge deep learning models for precise retinal disease detection and classification.',
      theme: 'medical'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Instant analysis with immediate diagnostic results for faster clinical decisions.',
      theme: 'tech'
    },
    {
      icon: Shield,
      title: 'Medical Grade Security',
      description: 'HIPAA-compliant platform with enterprise-level security and data protection.',
      theme: 'neural'
    },
    {
      icon: Target,
      title: 'Clinical Precision',
      description: 'Validated diagnostic accuracy with comprehensive disease coverage and detection.',
      theme: 'medical'
    }
  ];

  const primaryConditions = [
    {
      title: 'Diabetic Retinopathy',
      description: 'Damage to blood vessels in the retina caused by diabetes, leading to vision impairment.',
      severity: 'High Risk',
      icon: Eye,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      symptoms: ['Blurred vision', 'Dark spots', 'Difficulty seeing colors', 'Vision loss'],
      prevention: ['Blood sugar control', 'Regular eye exams', 'Blood pressure management', 'Healthy lifestyle']
    },
    {
      title: 'Age-related Macular Degeneration',
      description: 'Progressive disease affecting the macula, causing central vision loss in older adults.',
      severity: 'Progressive',
      icon: Target,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      symptoms: ['Central vision loss', 'Distorted vision', 'Difficulty reading', 'Color perception changes'],
      prevention: ['Regular monitoring', 'Healthy diet', 'UV protection', 'Smoking cessation']
    },
    {
      title: 'Glaucoma',
      description: 'Group of eye diseases that damage the optic nerve, often associated with high eye pressure.',
      severity: 'Progressive',
      icon: Activity,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      symptoms: ['Peripheral vision loss', 'Tunnel vision', 'Eye pain', 'Halos around lights'],
      prevention: ['Regular eye pressure checks', 'Early detection', 'Medication compliance', 'Lifestyle modifications']
    },
    {
      title: 'Healthy Retina',
      description: 'Normal retinal structure with healthy blood vessels, macula, and optic nerve.',
      severity: 'Healthy',
      icon: Heart,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      symptoms: ['Clear vision', 'Normal color perception', 'No distortion', 'Comfortable vision'],
      prevention: ['Annual eye exams', 'Healthy lifestyle', 'UV protection', 'Regular monitoring']
    }
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="bg-card/95 backdrop-blur-lg shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary p-2 rounded-xl shadow-lg">
                <Eye className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">RetinalAI</h1>
                <p className="text-xs text-primary font-medium">Advanced Vision Care</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </button>
              ))}
            </div>
            
            {/* Theme Toggle & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Link to="/auth">
                <Button className="text-base font-medium px-6">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-lg">
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
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="text-base font-medium">{item.name}</span>
                </button>
              ))}
              <div className="pt-4 border-t space-y-2">
                <Link to="/auth" className="block">
                  <Button className="w-full text-base font-medium">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-8 px-6 py-2 text-base font-semibold bg-primary/10 text-primary border-primary/20">
            <Activity className="h-5 w-5 mr-2" />
            AI-Powered Medical Diagnosis
          </Badge>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            Advanced Retinal
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Health Analysis
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Professional-grade AI-powered retinal disease detection using cutting-edge deep learning technology. 
            Accurate, fast, and accessible eye health screening for medical professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <Link to="/auth">
              <Button size="lg" className="text-lg font-semibold px-8 py-6 h-auto shadow-lg">
                Start Analysis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg font-semibold px-8 py-6 h-auto"
              onClick={() => setActiveTab('education')}
            >
              Learn More
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-20">
            {/* Features Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Why Choose RetinalAI
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Advanced AI technology meets medical expertise for unparalleled retinal health analysis
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-foreground mb-3">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Simple, fast, and accurate retinal analysis in three easy steps
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Upload, title: 'Upload Image', description: 'Upload your retinal scan or fundus photograph' },
                  { icon: Brain, title: 'AI Analysis', description: 'Our AI processes the image using advanced algorithms' },
                  { icon: CheckCircle, title: 'Get Results', description: 'Receive detailed analysis and recommendations' }
                ].map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground">{step.description}</p>
                  </div>
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
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  About RetinalAI
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  RetinalAI is a revolutionary medical diagnostic platform designed for retinal disease detection and prevention. 
                  Our technology combines advanced machine learning with medical expertise to provide accurate, fast, and accessible eye health screening.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      To democratize access to advanced retinal health screening through AI technology, 
                      enabling early detection and prevention of vision-threatening diseases.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Microscope className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">Our Technology</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      State-of-the-art deep learning models trained on extensive medical datasets, 
                      providing clinical-grade accuracy in retinal disease detection and classification.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold">Our Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      Empowering healthcare providers worldwide with accessible diagnostic tools, 
                      improving patient outcomes through early detection and timely intervention.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Team Section */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-foreground mb-6">Our Expert Team</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Leading medical professionals and AI researchers dedicated to advancing retinal healthcare
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="text-center border-0 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                      <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{member.bio}</p>
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
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Advanced Features
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive AI-powered analysis capabilities for professional retinal health assessment
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                {features.map((feature, index) => (
                  <Card key={index} className="border-0 bg-card/50 backdrop-blur p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Retinal Health Education
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Learn about common retinal conditions and the importance of early detection
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {primaryConditions.map((condition, index) => (
                  <Card key={index} className={`border-0 ${condition.bgColor} backdrop-blur p-6`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 ${condition.bgColor} rounded-lg flex items-center justify-center`}>
                          <condition.icon className={`h-6 w-6 ${condition.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-foreground">{condition.title}</CardTitle>
                          <Badge variant="secondary" className="mt-1">{condition.severity}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base text-muted-foreground mb-6 leading-relaxed">
                        {condition.description}
                      </CardDescription>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Common Symptoms:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {condition.symptoms.map((symptom, idx) => (
                              <li key={idx} className="flex items-center">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                {symptom}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Prevention & Care:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {condition.prevention.map((prevention, idx) => (
                              <li key={idx} className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {prevention}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-20">
            <section>
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Contact Us
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get in touch with our team for support, partnerships, or more information
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8">
                <Card className="text-center border-0 bg-card/50 backdrop-blur p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-4">Email Support</CardTitle>
                  <CardDescription className="text-base">
                    support@retinalai.com
                    <br />
                    Available 24/7 for technical support
                  </CardDescription>
                </Card>

                <Card className="text-center border-0 bg-card/50 backdrop-blur p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-4">Phone Support</CardTitle>
                  <CardDescription className="text-base">
                    +1 (555) 123-4567
                    <br />
                    Monday - Friday, 9 AM - 6 PM EST
                  </CardDescription>
                </Card>

                <Card className="text-center border-0 bg-card/50 backdrop-blur p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold mb-4">Office Location</CardTitle>
                  <CardDescription className="text-base">
                    123 Medical AI Drive
                    <br />
                    San Francisco, CA 94105
                  </CardDescription>
                </Card>
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary p-2 rounded-xl">
                  <Eye className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">RetinalAI</h3>
                  <p className="text-sm text-primary">Advanced Vision Care</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Revolutionizing retinal healthcare through advanced AI technology. 
                Accurate, fast, and accessible eye health screening for medical professionals worldwide.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => setActiveTab('about')} className="hover:text-primary transition-colors">About</button></li>
                <li><button onClick={() => setActiveTab('features')} className="hover:text-primary transition-colors">Features</button></li>
                <li><button onClick={() => setActiveTab('education')} className="hover:text-primary transition-colors">Education</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/auth" className="hover:text-primary transition-colors">Get Started</Link></li>
                <li><a href="mailto:support@retinalai.com" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 mt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 RetinalAI. All rights reserved. | Advanced AI-powered retinal health analysis platform.
            </p>
          </div>
        </div>
      </footer>

      {/* Medical Chatbot */}
      <MedicalChatbot 
        isExpanded={isChatExpanded}
        onToggleExpand={() => setIsChatExpanded(!isChatExpanded)}
      />
    </div>
  );
};

export default LandingPage;