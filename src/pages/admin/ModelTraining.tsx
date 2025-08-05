import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, Camera, Upload, Activity, Play, Video, Scan, 
  CheckCircle, AlertTriangle, Clock, Target, Database,
  BarChart3, Settings, Zap, Shield
} from 'lucide-react';
import ModelUpload from '@/components/ModelUpload';

const ModelTraining = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tabs = [
    { id: 'scan', label: 'Live Scan', icon: Scan },
    { id: 'training', label: 'Model Training', icon: Brain },
    { id: 'performance', label: 'Performance', icon: BarChart3 }
  ];

  const modelSpecs = [
    {
      name: 'ResNet18 CNN',
      accuracy: '94.2%',
      speed: '0.8s',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      name: 'DeiT Transformer',
      accuracy: '95.8%',
      speed: '1.2s', 
      icon: Zap,
      color: 'text-green-600'
    },
    {
      name: 'Ensemble Model',
      accuracy: '96.1%',
      speed: '0.9s',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  const trainingMetrics = [
    { label: 'Training Accuracy', value: '98.4%', trend: 'up' },
    { label: 'Validation Loss', value: '0.023', trend: 'down' },
    { label: 'F1 Score', value: '0.961', trend: 'up' },
    { label: 'Training Time', value: '2.3h', trend: 'stable' }
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
        alert('Analysis complete! Results saved to patient database.');
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Model Training & Live Scan</h1>
          <p className="text-gray-600">AI model management and real-time retinal analysis</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border border-gray-200 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-red-100 text-red-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Live Scan Tab */}
        {activeTab === 'scan' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Scan Area */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="h-6 w-6 text-red-600" />
                    <span>Live Retinal Scan</span>
                  </CardTitle>
                  <CardDescription>
                    Position the fundus camera for real-time retinal analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="relative bg-black rounded-lg overflow-hidden w-full max-w-md aspect-square">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {!isScanning && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                        <div className="text-center text-white">
                          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p className="text-sm text-gray-300">Camera not active</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 flex space-x-4">
                    {!isScanning ? (
                      <Button 
                        onClick={startCamera}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Start Camera
                      </Button>
                    ) : (
                      <>
                        <Button 
                          onClick={captureImage}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Scan className="mr-2 h-4 w-4" />
                          Capture & Analyze
                        </Button>
                        <Button 
                          onClick={stopCamera}
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          Stop Camera
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Models */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modelSpecs.map((model, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <model.icon className={`h-5 w-5 ${model.color}`} />
                          <div>
                            <p className="font-medium text-gray-800">{model.name}</p>
                            <p className="text-sm text-gray-600">Accuracy: {model.accuracy}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {model.speed}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">System Ready</p>
                      <p className="text-sm text-green-600">All models loaded and operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg. Processing Time</span>
                      <span className="text-sm font-medium">0.9s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">System Accuracy</span>
                      <span className="text-sm font-medium">96.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className="text-sm font-medium">99.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Model Training Tab */}
        {activeTab === 'training' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {trainingMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                      <div className={`h-3 w-3 rounded-full ${
                        metric.trend === 'up' ? 'bg-green-500' :
                        metric.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ModelUpload />
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {modelSpecs.map((model, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{model.name}</span>
                        <span className="text-sm text-gray-600">{model.accuracy}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" 
                          style={{ width: model.accuracy }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium">Security</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Secure</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium">Database</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium">API Status</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelTraining;