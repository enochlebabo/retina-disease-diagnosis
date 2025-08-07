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
import { supabase } from '@/integrations/supabase/client';

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
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ isFullPage = false, className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Reti-Doc AI Assistant powered by OpenAI. I\'m here to help you with retinal health questions, prevention tips, and guidance about our AI diagnostic system. Choose a topic below or ask me anything!',
      sender: 'bot',
      timestamp: new Date(),
      category: 'welcome'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      id: 'diseases',
      label: 'Retinal Diseases',
      icon: Eye,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Learn about CNV, DME, drusen, and normal retina'
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
    { text: "What is CNV?", category: "diseases" },
    { text: "How accurate is your AI?", category: "ai-system" },
    { text: "Tips for preventing eye diseases", category: "prevention" },
    { text: "What are the warning signs of DME?", category: "symptoms" },
    { text: "Tell me about drusen", category: "diseases" },
    { text: "Diet recommendations for eye health", category: "prevention" }
  ];

  const callOpenAI = async (message: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message, 
          context: selectedCategory ? categories.find(c => c.id === selectedCategory)?.label : 'general'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try asking again in a moment, or feel free to browse our educational content.';
      }

      return data?.response || 'I apologize, but I didn\'t receive a proper response. Could you please rephrase your question?';
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      return 'I\'m experiencing technical difficulties. Please try again or check our educational resources in the meantime.';
    }
  };

  const getFallbackResponse = (message: string): string => {
    const msg = message.toLowerCase();
    
    if (msg.includes('cnv') || msg.includes('choroidal neovascularization')) {
      return `🔍 **Choroidal Neovascularization (CNV)**

CNV is abnormal blood vessel growth beneath the retina, commonly associated with wet AMD. It's characterized by:

• **Severity**: Critical - requires immediate treatment
• **Symptoms**: Sudden vision loss, distorted vision, central scotoma
• **Treatment**: Anti-VEGF therapy, photodynamic therapy
• **Prevention**: Regular monitoring, early detection

Would you like to know more about CNV treatments or prevention strategies?`;
    }
    
    if (msg.includes('dme') || msg.includes('diabetic macular edema')) {
      return `💧 **Diabetic Macular Edema (DME)**

DME involves fluid accumulation in the macula due to diabetes:

• **Prevalence**: 7% of diabetic patients
• **Symptoms**: Blurred central vision, reading difficulty
• **Management**: Blood sugar control, anti-VEGF injections
• **Stages**: Mild, moderate, severe, center-involving DME

Early detection through regular eye exams is crucial!`;
    }
    
    if (msg.includes('drusen')) {
      return `⭐ **Drusen**

Yellow deposits under the retina - early signs of AMD:

• **Prevalence**: 30% of adults over 75
• **Types**: Small (<63μm), medium (63-124μm), large (>125μm)
• **Symptoms**: Usually asymptomatic initially
• **Monitoring**: Regular Amsler grid testing, OCT scans

Regular monitoring helps track progression to more serious conditions.`;
    }
    
    if (msg.includes('normal') || msg.includes('healthy')) {
      return `✅ **Normal (Healthy Retina)**

Characteristics of a healthy retina:

• **Blood vessels**: Normal caliber and appearance
• **Macula**: Clear, well-defined structure
• **Optic nerve**: Healthy appearance
• **Vision**: Clear, undistorted

Maintain retinal health through regular exams and healthy lifestyle choices!`;
    }
    
    return `Thank you for your question! I specialize in retinal health education, particularly focusing on our four main conditions: CNV, DME, Drusen, and Normal retinal health. 

I can provide information about:
• **Disease characteristics** and symptoms
• **Prevention strategies** and lifestyle tips  
• **Our AI diagnostic technology** 
• **When to seek medical care**

Could you be more specific about what you'd like to learn? For urgent medical concerns, please contact your healthcare provider immediately.`;
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

    try {
      let responseText: string;
      
      if (useAI) {
        responseText = await callOpenAI(text);
      } else {
        responseText = getFallbackResponse(text);
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        category: selectedCategory || 'general'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const fallbackResponse = getFallbackResponse(text);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'bot',
        timestamp: new Date(),
        category: 'general'
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
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
    <div className={`${isFullPage ? 'w-full h-full' : 'w-full max-w-4xl mx-auto'} ${className}`}>
      <Card className={`shadow-2xl border-2 border-border/50 backdrop-blur-sm transition-all duration-300 ${
        isFullPage ? 'h-full' : isMinimized ? 'h-16' : 'h-[600px] max-h-[80vh]'
      } flex flex-col overflow-hidden`}>
        <CardHeader className="bg-gradient-to-r from-primary via-primary to-primary/80 text-primary-foreground p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg font-bold truncate">Reti-Doc AI Assistant</CardTitle>
                <p className="text-sm opacity-90 truncate">Powered by OpenAI • Medical Guidance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hidden sm:flex">
                <Activity className="h-3 w-3 mr-1" />
                Online
              </Badge>
              {!isFullPage && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            {/* Category Selection */}
            {showSuggestions && (
              <div className="p-3 sm:p-4 bg-muted/30 border-b border-border">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-primary" />
                    Choose a topic to get started:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {categories.map((category) => (
                      <Card 
                        key={category.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${category.bgColor} ${category.borderColor} border-2`}
                        onClick={() => handleCategorySelect(category.id)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className={`p-2 rounded-lg ${category.bgColor}`}>
                              <category.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${category.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-xs sm:text-sm text-foreground truncate">{category.label}</h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{category.description}</p>
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
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 sm:h-8 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        onClick={() => handleSuggestionClick(suggestion.text, suggestion.category)}
                      >
                        {suggestion.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-hidden min-h-0">
              <ScrollArea className="h-full p-3 sm:p-4">
                <div className="space-y-4 sm:space-y-6 min-h-full">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                      <div className={`flex items-start space-x-2 sm:space-x-3 max-w-[90%] sm:max-w-[85%] ${
                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
                          message.sender === 'bot' 
                            ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground' 
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {message.sender === 'bot' ? (
                            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </div>
                        <div className={`rounded-xl p-3 sm:p-4 shadow-sm ${
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
                          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</div>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            {message.sender === 'bot' && (
                              <div className="flex items-center space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-5 w-5 sm:h-6 sm:w-6 p-0 ${message.helpful === true ? 'text-green-500' : 'text-muted-foreground hover:text-green-500'}`}
                                  onClick={() => markMessageHelpful(message.id, true)}
                                >
                                  <ThumbsUp className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`h-5 w-5 sm:h-6 sm:w-6 p-0 ${message.helpful === false ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                                  onClick={() => markMessageHelpful(message.id, false)}
                                >
                                  <ThumbsDown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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

            <div className="p-3 sm:p-4 border-t border-border bg-background">
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
              
              <div className="flex space-x-2 sm:space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={selectedCategory 
                    ? `Ask about ${categories.find(c => c.id === selectedCategory)?.label.toLowerCase()}...`
                    : "Type your question or select a topic above..."
                  }
                  className="flex-1 rounded-full border-2 focus:border-primary text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="btn-medical rounded-full px-3 sm:px-4 hover:scale-105 transition-transform"
                  size="sm"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 sm:mt-3">
                <p className="text-xs text-muted-foreground flex items-center">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">For medical emergencies, contact your healthcare provider immediately</span>
                  <span className="sm:hidden">Medical emergency? Contact healthcare provider</span>
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">AI-powered</span>
                  <span className="sm:hidden">AI</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatBot;