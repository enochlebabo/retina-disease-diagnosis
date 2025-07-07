
import React, { useState, useCallback } from 'react';
import { Upload, Image, X, Check, AlertCircle } from 'lucide-react';

interface AnalysisResult {
  disease: string;
  confidence: number;
  risk: 'Low' | 'Medium' | 'High';
  recommendations: string[];
}

const ImageUpload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        disease: 'Diabetic Retinopathy',
        confidence: 87.5,
        risk: 'Medium',
        recommendations: [
          'Regular monitoring recommended',
          'Consult with ophthalmologist within 2 weeks',
          'Blood sugar control optimization',
          'Follow-up imaging in 6 months'
        ]
      });
    }, 3000);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Fundus Image Analysis</h3>
        <p className="text-sm text-gray-600">Upload a fundus image for AI-powered retinal disease detection</p>
      </div>

      {!uploadedImage ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">Drop fundus image here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            <Image className="h-4 w-4 mr-2" />
            Select Image
          </label>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Uploaded fundus"
              className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
            />
            <button
              onClick={resetUpload}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {analyzing && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <p className="text-lg font-medium text-gray-700">Analyzing Image...</p>
              <p className="text-sm text-gray-500 mt-2">AI models are processing your fundus image</p>
            </div>
          )}

          {result && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full mr-3">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Analysis Complete</h4>
                  <p className="text-sm text-gray-600">AI diagnosis results</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Detected Condition</p>
                  <p className="text-xl font-bold text-gray-900">{result.disease}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Confidence Level</p>
                  <p className="text-xl font-bold text-green-600">{result.confidence}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Risk Assessment</p>
                  <p className={`text-xl font-bold ${
                    result.risk === 'High' ? 'text-red-600' : 
                    result.risk === 'Medium' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {result.risk}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <h5 className="font-semibold text-gray-800">Recommendations</h5>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-sm text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
