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

  const educationalResponses = {
    'diabetic retinopathy': {
      text: `🔍 **Diabetic Retinopathy** - Leading cause of blindness in diabetic patients

**Quick Facts:**
• Affects 34.6% of diabetic patients
• Prevents 95% of severe vision loss when detected early
• Our AI achieves 96.1% detection accuracy

**Symptoms to Watch:**
• Blurred vision
• Dark spots or floaters
• Difficulty seeing at night
• Vision loss

**Prevention Strategies:**
• Annual comprehensive eye exams
• Maintain HbA1c < 7%
• Control blood pressure
• Regular exercise
• Healthy diet

**Stages:**
1. Mild nonproliferative
2. Moderate nonproliferative  
3. Severe nonproliferative
4. Proliferative (advanced)

Would you like to know more about any specific aspect?`,
      category: 'diseases'
    },
    'macular degeneration': {
      text: `👁️ **Age-Related Macular Degeneration (AMD)** - Progressive condition affecting central vision

**Key Statistics:**
• Affects 8.7% of adults over 45
• Leading cause of vision loss in people over 50
• Two types: Dry (90%) and Wet (10%)

**Symptoms:**
• Central vision loss or blurriness
• Straight lines appear wavy
• Difficulty reading
• Color perception changes

**Risk Factors:**
• Age over 50
• Family history
• Smoking
• Cardiovascular disease

**Prevention:**
• UV-protective sunglasses
• Antioxidant vitamins (AREDS formula)
• Healthy diet with leafy greens
• Regular exercise
• No smoking

**Early Detection:** Regular Amsler grid testing can help detect changes in central vision.`,
      category: 'diseases'
    },
    'glaucoma': {
      text: `⚡ **Glaucoma** - The "Silent Thief of Sight"

**Critical Facts:**
• Affects 3.54% of population globally
• Often no symptoms until advanced
• Leading cause of irreversible blindness
• Can occur at any age, more common after 60

**Types:**
• Primary Open-Angle (90% of cases)
• Angle-Closure (emergency!)
• Normal-Tension
• Secondary

**Risk Factors:**
• Age over 60
• Family history
• High eye pressure
• Thin corneas
• Diabetes

**Prevention & Management:**
• Regular eye pressure checks
• Comprehensive eye exams every 1-2 years
• Exercise regularly
• Take prescribed eye drops consistently
• Protect eyes from injury

**Remember:** Once vision is lost to glaucoma, it cannot be restored. Early detection is crucial!`,
      category: 'diseases'
    },
    'hypertensive retinopathy': {
      text: `💓 **Hypertensive Retinopathy** - High blood pressure's effect on the eyes

**Overview:**
• Affects 8-15% of hypertensive patients
• Early indicator of cardiovascular complications
• Often reversible with proper BP control

**Symptoms:**
• Blurred or distorted vision
• Headaches
• Double vision
• Light sensitivity

**Grading System:**
1. Grade 1: Mild arterial narrowing
2. Grade 2: Arteriovenous crossing changes
3. Grade 3: Cotton wool spots, hemorrhages
4. Grade 4: Papilledema (severe)

**Management:**
• Maintain BP <130/80 mmHg
• DASH diet (low sodium, high potassium)
• Regular cardiovascular exercise
• Stress management
• Regular monitoring

**Connection:** Retinal changes often mirror changes in brain, heart, and kidneys.`,
      category: 'diseases'
    },
    'prevention': {
      text: `🛡️ **Comprehensive Eye Health Prevention Guide**

**Essential Habits:**
1. **Annual Eye Exams** - Early detection saves vision
2. **Diabetes Management** - Keep HbA1c < 7%
3. **Blood Pressure Control** - Target <130/80 mmHg
4. **UV Protection** - Quality sunglasses daily
5. **Healthy Diet** - Omega-3s, antioxidants, leafy greens
6. **No Smoking** - Doubles risk of eye diseases
7. **Regular Exercise** - Improves circulation
8. **Screen Time Management** - 20-20-20 rule

**Warning Signs:**
• Sudden vision changes
• Flashing lights or new floaters
• Eye pain or pressure
• Distorted vision

**Nutrition for Eye Health:**
• Lutein & Zeaxanthin (kale, spinach)
• Omega-3 fatty acids (fish)
• Vitamin C (citrus fruits)
• Vitamin E (nuts, seeds)
• Zinc (lean meats)

Remember: Prevention is always better than treatment!`,
      category: 'prevention'
    },
    'ai technology': {
      text: `🤖 **Reti-Doc AI Technology**

**Dual Neural Network Architecture:**
• **ResNet18 CNN** - Texture pattern recognition
• **DeiT Vision Transformer** - Global feature extraction
• **Ensemble Fusion** - Combined predictions

**Performance Metrics:**
• 96.1% accuracy on medical datasets
• <1 second analysis time
• Validated on EyePACS dataset
• 8+ disease types detected

**Security & Compliance:**
• HIPAA-compliant platform
• 256-bit end-to-end encryption
• Secure cloud infrastructure
• Comprehensive audit logging

**Detectable Conditions:**
✓ Diabetic Retinopathy (all stages)
✓ Age-Related Macular Degeneration
✓ Glaucoma
✓ Hypertensive Retinopathy
✓ Retinal Detachment
✓ Macular Edema
✓ Other retinal pathologies

**How It Works:**
1. Image preprocessing & enhancement
2. Dual AI analysis
3. Feature extraction & fusion
4. Confidence scoring
5. Detailed report generation

Ready to experience AI-powered eye care?`,
      category: 'ai-system'
    },
    'symptoms emergency': {
      text: `🚨 **URGENT EYE SYMPTOMS - SEEK IMMEDIATE CARE**

**Call 911 or Go to ER:**
• Sudden complete vision loss
• Severe eye pain with nausea/vomiting
• Chemical burns to the eye
• Traumatic eye injury
• Sudden double vision with headache

**Contact Eye Doctor Immediately:**
• Sudden partial vision loss
• New flashing lights or shower of floaters
• Curtain-like shadow in vision
• Sudden onset of severe light sensitivity
• Eye pain with vision changes

**Same-Day Appointment Needed:**
• Gradual vision loss over days
• Persistent eye pain
• New distortion in central vision
• Halos around lights at night
• Discharge with vision changes

**General Eye Health Tips:**
• Never ignore sudden vision changes
• Keep emergency eye care numbers handy
• Protect eyes during sports/work
• Know your family eye health history

**Remember:** Time is vision - don't delay seeking care for concerning symptoms!`,
      category: 'emergency'
    },
    'nutrition eye health': {
      text: `🥗 **Nutrition for Optimal Eye Health**

**Key Nutrients & Food Sources:**

**Lutein & Zeaxanthin** (Macular protection):
• Dark leafy greens (kale, spinach)
• Broccoli, peas, corn
• Egg yolks

**Omega-3 Fatty Acids** (Retinal health):
• Fatty fish (salmon, tuna, sardines)
• Walnuts, flaxseeds
• Chia seeds

**Vitamin A** (Night vision):
• Carrots, sweet potatoes
• Liver, dairy products
• Dark leafy greens

**Vitamin C** (Antioxidant protection):
• Citrus fruits, berries
• Bell peppers, tomatoes
• Broccoli, strawberries

**Vitamin E** (Cell protection):
• Nuts and seeds
• Vegetable oils
• Avocados

**Zinc** (Retinal health):
• Oysters, beef, pork
• Beans, nuts
• Whole grains

**AREDS Formula Benefits:**
Proven to reduce AMD progression by 25% in high-risk patients.

**Hydration:** Adequate water intake supports tear production and eye moisture.`,
      category: 'nutrition'
    }
  };

  const getAIResponse = (userMessage: string): { text: string; category: string } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('diabetic') || message.includes('diabetes')) {
      return educationalResponses['diabetic retinopathy'];
    } else if (message.includes('macular') || message.includes('amd')) {
      return educationalResponses['macular degeneration'];
    } else if (message.includes('glaucoma')) {
      return educationalResponses['glaucoma'];
    } else if (message.includes('hypertensive') || message.includes('blood pressure')) {
      return educationalResponses['hypertensive retinopathy'];
    } else if (message.includes('prevention') || message.includes('prevent') || message.includes('tips') || message.includes('care')) {
      return educationalResponses['prevention'];
    } else if (message.includes('nutrition') || message.includes('diet') || message.includes('food') || message.includes('vitamin')) {
      return educationalResponses['nutrition eye health'];
    } else if (message.includes('accuracy') || message.includes('model') || message.includes('technology') || (message.includes('ai') && !message.includes('pain'))) {
      return educationalResponses['ai technology'];
    } else if (message.includes('emergency') || message.includes('urgent') || message.includes('immediate') || message.includes('911')) {
      return educationalResponses['symptoms emergency'];
    } else if (message.includes('symptom') || message.includes('warning') || message.includes('sign') || message.includes('pain') || message.includes('loss')) {
      return educationalResponses['symptoms emergency'];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        text: `Hello! 👋 I'm Reti-Doc AI Assistant, your comprehensive guide to retinal health education!

🏥 **I can help you with:**
• **Retinal Diseases** - Diabetic retinopathy, AMD, glaucoma, hypertensive retinopathy
• **Prevention & Care** - Evidence-based tips for optimal eye health
• **AI Technology** - How our 96.1% accurate diagnostic system works
• **Symptoms & Emergency Care** - When to seek immediate attention
• **Nutrition** - Foods and nutrients that support eye health

Choose a category above or ask me anything specific! Remember, I provide educational information but always consult healthcare professionals for medical advice.`,
        category: 'welcome'
      };
    } else if (message.includes('help')) {
      return {
        text: `🔍 **I'm here to provide comprehensive retinal health education!**

**My Knowledge Areas:**
📚 **Disease Education** - Detailed information on retinal conditions
🛡️ **Prevention Strategies** - Evidence-based eye health tips
🤖 **AI Technology** - How our diagnostic system achieves 96.1% accuracy
🚨 **Emergency Guidance** - When to seek immediate medical care
🥗 **Nutrition** - Foods and supplements for eye health

**Quick Start Options:**
• Type "diabetic retinopathy" for diabetes-related eye complications
• Ask "prevention tips" for eye health strategies
• Say "AI technology" to learn about our diagnostic system
• Type "emergency symptoms" for urgent warning signs

What would you like to explore first?`,
        category: 'help'
      };
    } else if (message.includes('reti-doc') || message.includes('platform') || message.includes('system')) {
      return {
        text: `🏥 **Welcome to Reti-Doc - Advanced AI Retinal Healthcare Platform**

**Our Mission:** Democratizing eye health through AI-powered early detection and comprehensive education.

**Platform Highlights:**
• 96.1% diagnostic accuracy with dual AI architecture
• Real-time analysis in <1 second
• HIPAA-compliant and secure
• 8+ detectable retinal conditions
• Comprehensive educational resources

**For Healthcare Providers:**
✓ Clinical decision support
✓ Standardized screening protocols
✓ Patient management tools
✓ Educational resources

**For Patients:**
✓ Early disease detection
✓ Educational content library
✓ Prevention guidance
✓ Risk assessment tools

Ready to experience the future of retinal healthcare? Ask me about any specific feature!`,
        category: 'platform'
      };
    } else {
      return {
        text: `Thank you for your question! 💡 

I specialize in retinal health education and can provide detailed information about:
• **Retinal diseases** (diabetic retinopathy, AMD, glaucoma, etc.)
• **Prevention strategies** and eye health tips
• **Our AI diagnostic technology** and how it works
• **Emergency symptoms** and when to seek care
• **Nutrition** for optimal eye health

Could you be more specific about what you'd like to learn? For immediate medical concerns, please contact your healthcare provider.

**Helpful prompts to try:**
- "Tell me about diabetic retinopathy"
- "Eye health prevention tips"
- "How does your AI work?"
- "Emergency eye symptoms"`,
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