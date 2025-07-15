import React, { useState, useCallback } from 'react';
import { Upload, FileText, Database, Brain, CheckCircle, AlertTriangle, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  preview?: string;
}

const ModelUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const { toast } = useToast();

  const supportedFormats = [
    { ext: '.jpg/.jpeg', desc: 'Retinal fundus images' },
    { ext: '.png', desc: 'High-quality retinal scans' },
    { ext: '.tiff', desc: 'Medical imaging format' },
    { ext: '.csv', desc: 'Dataset annotations' },
    { ext: '.json', desc: 'Metadata and labels' }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  }, []);

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/tiff', 'text/csv', 'application/json'];
      return validTypes.includes(file.type) && file.size <= 50 * 1024 * 1024; // 50MB limit
    });

    if (validFiles.length !== files.length) {
      toast({
        title: "Invalid Files",
        description: "Some files were skipped. Please upload supported formats under 50MB.",
        variant: "destructive"
      });
    }

    validFiles.forEach(file => {
      const fileId = Date.now().toString() + Math.random();
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate file upload
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === fileId) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            const newStatus = newProgress >= 100 ? 'completed' : 'uploading';
            return { ...f, progress: newProgress, status: newStatus };
          }
          return f;
        }));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
        ));

        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setUploadedFiles(prev => prev.map(f => 
              f.id === fileId ? { ...f, preview: e.target?.result as string } : f
            ));
          };
          reader.readAsDataURL(file);
        }
      }, 2000 + Math.random() * 3000);
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const startTraining = () => {
    if (uploadedFiles.filter(f => f.status === 'completed').length === 0) {
      toast({
        title: "No Files Ready",
        description: "Please upload and wait for files to complete processing before training.",
        variant: "destructive"
      });
      return;
    }

    setIsTraining(true);
    setTrainingProgress(0);

    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          toast({
            title: "Training Complete",
            description: "Your custom model has been successfully trained and is ready for deployment.",
          });
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-foreground mb-4">AI Model Training Center</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload your retinal datasets to train custom AI models. Support for images, annotations, and metadata.
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Upload Dataset</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Model Training</span>
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Data Management</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card className="card-tech">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-6 w-6 text-primary" />
                <span>Upload Training Data</span>
              </CardTitle>
              <CardDescription>
                Upload retinal images, annotations, and metadata files for AI model training
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      Drop files here or{' '}
                      <Label htmlFor="file-upload" className="text-primary cursor-pointer hover:underline">
                        browse
                      </Label>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Support for JPG, PNG, TIFF images and CSV, JSON annotations (max 50MB each)
                    </p>
                  </div>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".jpg,.jpeg,.png,.tiff,.csv,.json"
                  />
                </div>
              </div>

              {/* Supported Formats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium text-sm">{format.ext}</div>
                      <div className="text-xs text-muted-foreground">{format.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center space-x-4 p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
                            <span>{formatFileSize(file.size)}</span>
                            <Badge variant={
                              file.status === 'completed' ? 'default' :
                              file.status === 'error' ? 'destructive' : 'secondary'
                            }>
                              {file.status}
                            </Badge>
                          </div>
                          {file.status !== 'completed' && (
                            <Progress value={file.progress} className="h-2" />
                          )}
                        </div>
                        {file.preview && (
                          <div className="w-12 h-12 rounded overflow-hidden">
                            <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <Card className="card-neural">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-primary" />
                <span>AI Model Training</span>
              </CardTitle>
              <CardDescription>
                Configure and train custom retinal disease detection models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input id="model-name" placeholder="Custom Retinal Model v1.0" />
                  </div>
                  <div>
                    <Label htmlFor="epochs">Training Epochs</Label>
                    <Input id="epochs" type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label htmlFor="learning-rate">Learning Rate</Label>
                    <Input id="learning-rate" defaultValue="0.001" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Input id="batch-size" type="number" defaultValue="32" />
                  </div>
                  <div>
                    <Label htmlFor="validation-split">Validation Split</Label>
                    <Input id="validation-split" defaultValue="0.2" />
                  </div>
                  <div>
                    <Label htmlFor="architecture">Model Architecture</Label>
                    <select className="w-full p-2 border border-border rounded-md bg-background">
                      <option>ResNet18 + DeiT Small (Recommended)</option>
                      <option>ResNet50 + Vision Transformer</option>
                      <option>EfficientNet + Custom CNN</option>
                    </select>
                  </div>
                </div>
              </div>

              {isTraining && (
                <div className="space-y-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-primary animate-pulse" />
                    <span className="font-medium">Training in Progress...</span>
                  </div>
                  <Progress value={trainingProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Training progress: {trainingProgress.toFixed(1)}% - Estimated time remaining: {Math.max(0, 10 - Math.floor(trainingProgress / 10))} minutes
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <Button 
                  onClick={startTraining} 
                  disabled={isTraining || uploadedFiles.filter(f => f.status === 'completed').length === 0}
                  className="btn-neural px-8"
                  size="lg"
                >
                  {isTraining ? (
                    <>
                      <Brain className="mr-2 h-5 w-5 animate-pulse" />
                      Training Model...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-5 w-5" />
                      Start Training
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <Card className="card-medical">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                <span>Dataset Management</span>
              </CardTitle>
              <CardDescription>
                Manage your training datasets and model versions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-tech p-6 text-center">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground">{uploadedFiles.length}</div>
                  <div className="text-sm text-muted-foreground">Total Files</div>
                </div>
                <div className="card-neural p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground">
                    {uploadedFiles.filter(f => f.status === 'completed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Processed</div>
                </div>
                <div className="card-medical p-6 text-center">
                  <Database className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-foreground">
                    {(uploadedFiles.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)}MB
                  </div>
                  <div className="text-sm text-muted-foreground">Total Size</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Dataset Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="btn-outline-medical">
                    <Download className="mr-2 h-4 w-4" />
                    Export Dataset
                  </Button>
                  <Button variant="outline" className="btn-outline-tech">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                  <Button variant="outline" className="btn-outline-neural">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelUpload;