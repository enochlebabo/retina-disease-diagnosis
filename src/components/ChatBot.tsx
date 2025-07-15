import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, X, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Reti-Doc AI Assistant. I can help you with retinal health questions, prevention tips, and general guidance about our AI diagnostic system. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const medicalResponses = {
    'diabetic retinopathy': 'Diabetic retinopathy is a complication of diabetes that affects the blood vessels in the retina. Early detection is crucial. Our AI can detect it with 96.1% accuracy. Key prevention: control blood sugar levels, regular eye exams, and maintain healthy blood pressure.',
    'macular degeneration': 'Age-related macular degeneration (AMD) affects central vision. There are two types: dry and wet AMD. Our AI can help detect early signs. Prevention includes: eating leafy greens, protecting eyes from UV light, not smoking, and regular eye checkups.',
    'glaucoma': 'Glaucoma is often called the "silent thief of sight" because it typically has no symptoms until advanced stages. Regular eye pressure checks and optic nerve examinations are essential. Our AI can detect early structural changes in the retina.',
    'prevention': 'Key retinal health tips: 1) Regular comprehensive eye exams, 2) Control diabetes and blood pressure, 3) Wear UV-protective sunglasses, 4) Maintain a healthy diet rich in omega-3 fatty acids and antioxidants, 5) Don\'t smoke, 6) Exercise regularly.',
    'ai accuracy': 'Our dual AI architecture combines ResNet18 CNN and DeiT Small Vision Transformer, achieving 96.1% accuracy on medical datasets. The system has been validated on the EyePACS dataset with comprehensive disease coverage.',
    'how it works': 'Our AI system works in three steps: 1) Image preprocessing and normalization, 2) Dual model analysis using CNN and Transformer networks, 3) Ensemble fusion for final prediction with confidence scoring and medical recommendations.'
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('diabetic') || message.includes('diabetes')) {
      return medicalResponses['diabetic retinopathy'];
    } else if (message.includes('macular') || message.includes('amd')) {
      return medicalResponses['macular degeneration'];
    } else if (message.includes('glaucoma')) {
      return medicalResponses['glaucoma'];
    } else if (message.includes('prevention') || message.includes('prevent') || message.includes('tips')) {
      return medicalResponses['prevention'];
    } else if (message.includes('accuracy') || message.includes('ai') || message.includes('model')) {
      return medicalResponses['ai accuracy'];
    } else if (message.includes('how') && (message.includes('work') || message.includes('function'))) {
      return medicalResponses['how it works'];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! I\'m here to help with retinal health questions. You can ask me about diabetic retinopathy, macular degeneration, glaucoma, prevention tips, or how our AI system works.';
    } else if (message.includes('help')) {
      return 'I can assist you with: retinal disease information, prevention strategies, understanding our AI diagnostic system, general eye health tips, and guidance on using our platform. What specific topic interests you?';
    } else {
      return 'Thank you for your question! For specific medical concerns, please consult with a healthcare professional. I can provide general information about retinal diseases, prevention tips, and how our AI diagnostic system works. Could you please be more specific about what you\'d like to know?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
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

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full btn-medical shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMaximized 
        ? 'inset-4' 
        : 'bottom-6 right-6 w-96 h-[32rem]'
    }`}>
      <Card className="h-full flex flex-col shadow-2xl border-2 border-primary/20">
        <CardHeader className="pb-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Reti-Doc AI Assistant</CardTitle>
                <p className="text-sm opacity-90">Medical Guidance & Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.sender === 'bot' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      {message.sender === 'bot' ? (
                        <Bot className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'bot'
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary text-primary-foreground p-2 rounded-full">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted text-muted-foreground rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about retinal health, prevention, or our AI system..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="btn-medical"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              For medical emergencies, contact your healthcare provider immediately
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;