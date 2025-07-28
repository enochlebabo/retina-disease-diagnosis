import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, Send, Bot, User, X, Maximize2, Minimize2, Lightbulb, 
  Heart, Eye, Shield, Activity, HelpCircle, Stethoscope, Brain, Zap,
  Clock, Star, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  category?: string;
  helpful?: boolean;
}

interface ChatBotProps {
  isFullPage?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ isFullPage = false }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Reti-Doc AI Assistant. I\'m here to help you with retinal health questions, prevention tips, and guidance about our AI diagnostic system. Choose a topic below or ask me anything!',
      sender: 'bot',
      timestamp: new Date(),
      category: 'welcome'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'diseases',
      label: 'Retinal Diseases',
      icon: Eye,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Learn about diabetic retinopathy, macular degeneration, glaucoma'
    },
    {
      id: 'prevention',
      label: 'Prevention & Care',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Eye health tips, prevention strategies, healthy habits'
    },
    {
      id: 'ai-system',
      label: 'AI Diagnostic System',
      icon: Brain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'How our AI works, accuracy, technology details'
    },
    {
      id: 'symptoms',
      label: 'Symptoms & Signs',
      icon: Activity,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Warning signs, when to see a doctor, symptom checker'
    }
  ];

  const quickSuggestions = [
    { text: "What is diabetic retinopathy?", category: "diseases" },
    { text: "How accurate is your AI?", category: "ai-system" },
    { text: "Tips for preventing eye diseases", category: "prevention" },
    { text: "What are the warning signs of vision problems?", category: "symptoms" },
    { text: "How does the AI diagnosis work?", category: "ai-system" },
    { text: "Diet recommendations for eye health", category: "prevention" }
  ];

  const medicalResponses = {
    'diabetic retinopathy': {
      text: 'Diabetic retinopathy is a serious complication of diabetes affecting retinal blood vessels. Our AI detects it with 96.1% accuracy. **Key Prevention:** Control blood sugar levels, get annual eye exams, maintain healthy blood pressure. Early detection can prevent 95% of severe vision loss!',
      category: 'diseases'
    },
    'macular degeneration': {
      text: 'Age-related macular degeneration (AMD) affects central vision and is the leading cause of vision loss in people over 50. There are two types: dry (90%) and wet (10%). **Prevention:** Eat leafy greens, protect from UV light, don\'t smoke, and get regular checkups.',
      category: 'diseases'
    },
    'glaucoma': {
      text: 'Glaucoma is called the "silent thief of sight" - often no symptoms until advanced stages. It affects 3.54% globally. **Warning:** Regular eye pressure checks and optic nerve exams are essential. Our AI can detect early structural changes.',
      category: 'diseases'
    },
    'prevention': {
      text: '🛡️ **Essential Eye Health Tips:** 1) Annual comprehensive eye exams 2) Control diabetes & blood pressure 3) Wear UV-protective sunglasses 4) Diet rich in omega-3s & antioxidants 5) Don\'t smoke 6) Exercise regularly 7) Manage screen time',
      category: 'prevention'
    },
    'ai accuracy': {
      text: 'Our **dual AI architecture** combines ResNet18 CNN + DeiT Small Vision Transformer = **96.1% accuracy** on medical datasets! Validated on EyePACS with 8+ disease types. Processing time: <1 second. HIPAA-compliant with 256-bit encryption.',
      category: 'ai-system'
    },
    'how it works': {
      text: '🧠 **Our AI Process:** 1) **Image Preprocessing** - Normalizes & enhances retinal images 2) **Dual Model Analysis** - CNN extracts textures, Transformer captures global features 3) **Ensemble Fusion** - Combines predictions for final diagnosis with confidence scoring',
      category: 'ai-system'
    },
    'symptoms warning': {
      text: '⚠️ **Seek immediate medical attention if you experience:** • Sudden vision loss • Flashing lights or floaters • Curtain-like vision loss • Severe eye pain • Distorted vision • Dark spots in central vision. Early detection saves sight!',
      category: 'symptoms'
    }
  };

  const getAIResponse = (userMessage: string): { text: string; category: string } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('diabetic') || message.includes('diabetes')) {
      return medicalResponses['diabetic retinopathy'];
    } else if (message.includes('macular') || message.includes('amd')) {
      return medicalResponses['macular degeneration'];
    } else if (message.includes('glaucoma')) {
      return medicalResponses['glaucoma'];
    } else if (message.includes('prevention') || message.includes('prevent') || message.includes('tips') || message.includes('care')) {
      return medicalResponses['prevention'];
    } else if (message.includes('accuracy') || message.includes('model') || (message.includes('ai') && !message.includes('pain'))) {
      return medicalResponses['ai accuracy'];
    } else if (message.includes('how') && (message.includes('work') || message.includes('function') || message.includes('diagnosis'))) {
      return medicalResponses['how it works'];
    } else if (message.includes('symptom') || message.includes('warning') || message.includes('sign') || message.includes('pain') || message.includes('loss')) {
      return medicalResponses['symptoms warning'];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: 'Hello! 👋 I\'m your AI medical assistant. I can help with retinal diseases, prevention tips, AI system details, and symptom guidance. Choose a category above or ask me anything!',
        category: 'welcome'
      };
    } else if (message.includes('help')) {
      return {
        text: 'I\'m here to help! 🔍 **I can assist with:** • Retinal disease information • Prevention strategies • AI diagnostic system details • Symptom guidance • General eye health tips. What interests you most?',
        category: 'help'
      };
    } else {
      return {
        text: 'Thank you for your question! 💡 For specific medical concerns, please consult a healthcare professional. I provide general information about retinal diseases, prevention, and our AI system. Could you be more specific about what you\'d like to know?',
        category: 'general'
      };
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date(),
      category: selectedCategory || 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        category: response.category
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string, category: string) => {
    setSelectedCategory(category);
    handleSendMessage(suggestion);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      const message = `Tell me about ${category.label.toLowerCase()}`;
      handleSendMessage(message);
    }
  };

  const markMessageHelpful = (messageId: string, helpful: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, helpful } : msg
    ));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`${isFullPage ? 'w-full h-full' : 'w-full max-w-6xl mx-auto'}`}>
      <Card className="h-full flex flex-col shadow-xl border border-border">
        <CardHeader className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-3 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-xl">Reti-Doc AI Assistant</CardTitle>
                <p className="text-sm opacity-90">Intelligent Medical Guidance & Support</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Activity className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Category Selection */}
          {showSuggestions && (
            <div className="p-4 bg-muted/30 border-b border-border">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                  Choose a topic to get started:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <Card 
                      key={category.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${category.bgColor} ${category.borderColor} border-2`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${category.bgColor}`}>
                            <category.icon className={`h-5 w-5 ${category.color}`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-foreground">{category.label}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-primary" />
                  Quick questions:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      onClick={() => handleSuggestionClick(suggestion.text, suggestion.category)}
                    >
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full p-4">
              <div className="space-y-6 min-h-full">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[85%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        message.sender === 'bot' 
                          ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}>
                        {message.sender === 'bot' ? (
                          <Bot className="h-5 w-5" />
                        ) : (
                          <User className="h-5 w-5" />
                        )}
                      </div>
                      <div className={`rounded-xl p-4 shadow-sm ${
                        message.sender === 'bot'
                          ? 'bg-muted text-muted-foreground border border-border'
                          : 'bg-primary text-primary-foreground'
                      }`}>
                        {message.category && message.sender === 'bot' && message.category !== 'welcome' && (
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {categories.find(c => c.id === message.category)?.label || message.category}
                            </Badge>
                          </div>
                        )}
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {message.sender === 'bot' && (
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 w-6 p-0 ${message.helpful === true ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'}`}
                                onClick={() => markMessageHelpful(message.id, true)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 w-6 p-0 ${message.helpful === false ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                                onClick={() => markMessageHelpful(message.id, false)}
                              >
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-2 rounded-full">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="bg-muted text-muted-foreground rounded-xl p-4 border border-border">
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                          <span className="text-xs text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          <div className="p-4 border-t border-border bg-background">
            {selectedCategory && (
              <div className="mb-3">
                <Badge variant="outline" className="text-xs">
                  {categories.find(c => c.id === selectedCategory)?.label} mode
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-2"
                    onClick={() => setSelectedCategory(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={selectedCategory 
                  ? `Ask about ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}...`
                  : "Type your question or select a topic above..."
                }
                className="flex-1 rounded-full border-2 focus:border-primary"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="btn-medical rounded-full px-4 hover:scale-105 transition-transform"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-muted-foreground flex items-center">
                <HelpCircle className="h-3 w-3 mr-1" />
                For medical emergencies, contact your healthcare provider immediately
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>Response time: ~1s</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;