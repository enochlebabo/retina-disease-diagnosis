import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Monitor, Brain, Stethoscope, Shield, ArrowRight, Target, 
  Clock, FileText, TrendingUp, Users, Eye, BookOpen
} from 'lucide-react';

const About = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary-foreground to-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-white/10 text-white border-white/20">
            <Eye className="h-4 w-4 mr-2" />
            About Reti-Doc
          </Badge>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            System Architecture
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
            Comprehensive overview of our medical AI platform
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Statistics */}
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* System Architecture */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              System Architecture
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive medical AI platform combines cutting-edge technology with clinical expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {systemModules.map((module, index) => (
              <Card key={index} className={`${getThemeClasses(module.theme)} hover:shadow-xl transition-all duration-300`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <module.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{module.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {module.modules.map((subModule, subIndex) => (
                      <div key={subIndex} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground">{subModule.name}</h4>
                          <p className="text-sm text-muted-foreground">{subModule.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Led by world-class medical professionals and AI researchers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-8">
            To democratize access to advanced retinal healthcare through AI-powered diagnostic tools, 
            enabling early detection and prevention of vision-threatening diseases worldwide.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/education">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Learn More
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;