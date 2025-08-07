import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, Upload, Send, Bot, User, X, Maximize2, Minimize2, 
  Eye, Shield, Activity, HelpCircle, Brain, Zap, Clock, 
  FileImage, Trash2, RotateCcw, Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  image?: string;
  hasImage?: boolean;
}

interface VisionChatBotProps {
  isFullPage?: boolean;
  className?: string;
}

const VisionChatBot: React.FC<VisionChatBotProps> = ({ isFullPage = false, className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '👁️ Hello! I\'m Reti-Doc Vision AI Assistant. I can analyze retinal images and provide educational insights about CNV, DME, Drusen, and normal retinal conditions.\n\n📸 Upload a retinal image or ask me questions about retinal health!',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);

  const quickSuggestions = [
    "What is CNV?",
    "Explain DME symptoms",
    "Tell me about drusen",
    "How to maintain healthy retinas?",
    "What are signs of retinal disease?",
    "Explain retinal imaging techniques"
  ];

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsUsingCamera(true);
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
      setIsUsingCamera(false);
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
      
      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageData = e.target?.result as string;
            setSelectedImage(imageData);
            setImagePreview(imageData);
            stopCamera();
          };
          reader.readAsDataURL(blob);
        }
      }, 'image/jpeg', 0.8);
    }
  }, [stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setSelectedImage(imageData);
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const callVisionAI = async (message: string, image?: string): Promise<string> => {
    try {
      const { data, error } = await supabase.functions.invoke('vision-chat', {
        body: { 
          message, 
          image,
          context: 'retinal image analysis'
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        return 'I apologize, but I\'m having trouble connecting to the vision AI service right now. Please try again in a moment.';
      }

      return data?.response || 'I apologize, but I didn\'t receive a proper response. Could you please try again?';
    } catch (error) {
      console.error('Error calling Vision AI:', error);
      return 'I\'m experiencing technical difficulties with image analysis. Please try again later.';
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text || 'Image uploaded for analysis',
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage || undefined,
      hasImage: !!selectedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await callVisionAI(text, selectedImage || undefined);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I encountered an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
      removeImage(); // Clear image after sending
    }
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
    <div className={`w-full ${isFullPage ? 'h-full' : 'max-w-5xl mx-auto'} ${className}`}>
      <Card className={`shadow-2xl border-2 border-border/50 backdrop-blur-sm transition-all duration-300 ${
        isFullPage ? 'h-full' : isMinimized ? 'h-16' : 'h-[600px] sm:h-[650px] lg:h-[700px]'
      } flex flex-col overflow-hidden w-full`}>
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Eye className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg font-bold truncate">Reti-Doc Vision AI</CardTitle>
                <p className="text-sm opacity-90 truncate">AI-Powered Retinal Image Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hidden sm:flex">
                <Brain className="h-3 w-3 mr-1" />
                Vision AI
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
          <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
            {/* Quick Actions */}
            <div className="p-3 sm:p-4 bg-muted/30 border-b border-border flex-shrink-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Image</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={isUsingCamera ? stopCamera : startCamera}
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>{isUsingCamera ? 'Stop Camera' : 'Use Camera'}</span>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 sm:h-8 hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleSendMessage(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Camera View */}
            {isUsingCamera && (
              <div className="p-4 bg-black/90 text-center flex-shrink-0">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="max-w-full max-h-64 rounded-lg mb-4"
                />
                <div className="flex justify-center space-x-4">
                  <Button onClick={captureImage} className="bg-white text-black hover:bg-gray-200">
                    <Camera className="h-4 w-4 mr-2" />
                    Capture
                  </Button>
                  <Button onClick={stopCamera} variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="p-4 bg-muted/50 border-b border-border flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold">Image Ready for Analysis</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeImage}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <img
                  src={imagePreview}
                  alt="Selected for analysis"
                  className="max-w-full max-h-32 rounded-lg object-contain mx-auto block"
                />
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-hidden min-h-0">
              <ScrollArea className="h-full">
                <div className="p-3 sm:p-4 space-y-4 sm:space-y-6"
                     style={{ minHeight: '200px' }}>
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
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                            : 'bg-accent text-accent-foreground'
                        }`}>
                          {message.sender === 'bot' ? (
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          ) : (
                            <User className="h-4 w-4 sm:h-5 sm:w-5" />
                          )}
                        </div>
                        <div className={`rounded-xl p-3 sm:p-4 shadow-sm ${
                          message.sender === 'bot'
                            ? 'bg-muted text-muted-foreground border border-border'
                            : 'bg-primary text-primary-foreground'
                        }`}>
                          {message.hasImage && message.image && (
                            <div className="mb-3">
                              <img
                                src={message.image}
                                alt="Uploaded for analysis"
                                className="max-w-full max-h-32 rounded-lg object-contain"
                              />
                            </div>
                          )}
                          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.text}</div>
                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full">
                          <Eye className="h-5 w-5" />
                        </div>
                        <div className="bg-muted text-muted-foreground rounded-xl p-4 border border-border">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                            <span className="text-xs text-muted-foreground">Analyzing image...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 border-t border-border bg-background flex-shrink-0">
              <div className="flex space-x-2 sm:space-x-3 w-full max-w-4xl mx-auto">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about retinal health or upload an image for analysis..."
                  className="flex-1 rounded-full border-2 focus:border-primary text-sm"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={(!inputValue.trim() && !selectedImage) || isTyping}
                  className="rounded-full px-3 sm:px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  size="sm"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 sm:mt-3 w-full max-w-4xl mx-auto">
                <p className="text-xs text-muted-foreground flex items-center">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">For educational purposes only - not for medical diagnosis</span>
                  <span className="sm:hidden">Educational purposes only</span>
                </p>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Brain className="h-3 w-3" />
                  <span className="hidden sm:inline">Vision AI</span>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {/* Hidden canvas for camera capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VisionChatBot;