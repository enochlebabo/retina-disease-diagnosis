import React, { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useToast } from '../../components/ui/use-toast';
import { 
  Upload, 
  Brain, 
  Eye, 
  FileImage, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Download,
  Share2
} from 'lucide-react';

interface DiagnosisResult {
  id: string;
  timestamp: string;
  analysisType: string;
  findings: {
    primary: string[];
    confidence: { [key: string]: number };
    severity: 'low' | 'medium' | 'high';
    location: string;
  };
  recommendations: string[];
  educational: {
    anatomy: string;
    conditions: { [key: string]: any };
  };
  qualityMetrics: {
    imageQuality: string;
    analysisReliability: number;
  };
  fullAnalysis: string;
  disclaimer: string;
}

const DiagnosisCenter = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [analysisType, setAnalysisType] = useState<'oct' | 'fundus' | 'comprehensive'>('comprehensive');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please select a retinal image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = (e.target?.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('retinal-diagnosis', {
          body: {
            imageData: base64Data,
            analysisType
          }
        });

        if (error) throw error;

        setResult(data);
        toast({
          title: "Analysis Complete",
          description: "Retinal image analysis has been completed successfully",
        });
      };
      reader.readAsDataURL(selectedFile);
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the retinal image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <Info className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Diagnosis Center</h1>
            <p className="text-blue-100">Advanced Retinal Image Analysis Platform</p>
          </div>
          <div className="bg-white/20 p-3 rounded-lg">
            <Brain className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FileImage className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Image Upload</h2>
            </div>

            {/* Analysis Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Analysis Type</label>
              <div className="flex space-x-2">
                {[
                  { value: 'oct', label: 'OCT' },
                  { value: 'fundus', label: 'Fundus' },
                  { value: 'comprehensive', label: 'Comprehensive' }
                ].map((type) => (
                  <Button
                    key={type.value}
                    variant={analysisType === type.value ? 'default' : 'outline'}
                    onClick={() => setAnalysisType(type.value as any)}
                    size="sm"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <img 
                    src={imagePreview} 
                    alt="Selected retinal image" 
                    className="max-h-40 mx-auto rounded-lg shadow-md"
                  />
                  <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      setImagePreview('');
                      setResult(null);
                    }}
                  >
                    Select Different Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 mx-auto text-gray-400" />
                  <div>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-500">Upload retinal image</span>
                      <span className="text-gray-500"> or drag and drop</span>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500">Supports OCT and fundus images (JPG, PNG)</p>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Analyze Image
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold">Analysis Results</h2>
              </div>
              {result && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              )}
            </div>

            {result ? (
              <div className="space-y-6">
                {/* Primary Findings */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Primary Findings</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.findings.primary.map((finding, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {finding}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Severity Assessment */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Risk Assessment</h3>
                  <div className={`flex items-center space-x-2 p-3 rounded-lg border ${getSeverityColor(result.findings.severity)}`}>
                    {getSeverityIcon(result.findings.severity)}
                    <span className="font-medium capitalize">{result.findings.severity} Risk</span>
                  </div>
                </div>

                {/* Confidence Scores */}
                {Object.keys(result.findings.confidence).length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Confidence Scores</h3>
                    <div className="space-y-2">
                      {Object.entries(result.findings.confidence).map(([condition, score]) => (
                        <div key={condition} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{condition}</span>
                          <span className="text-sm font-medium">{score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quality Metrics */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Image Quality</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Image Quality</p>
                      <p className="font-medium">{result.qualityMetrics.imageQuality}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Reliability</p>
                      <p className="font-medium">{result.qualityMetrics.analysisReliability}%</p>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Recommendations</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-blue-50 rounded">
                        <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">{result.disclaimer}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Upload and analyze a retinal image to view results</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DiagnosisCenter;