import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RETINAL_CONDITIONS = {
  'cnv': {
    name: 'Choroidal Neovascularization',
    severity: 'high',
    description: 'Abnormal blood vessel growth beneath the retina, often associated with wet AMD',
    recommendations: 'Immediate ophthalmologist consultation recommended. Anti-VEGF therapy may be required.'
  },
  'dme': {
    name: 'Diabetic Macular Edema',
    severity: 'high',
    description: 'Fluid accumulation in the macula due to diabetic retinopathy',
    recommendations: 'Urgent diabetes management and retinal specialist evaluation needed.'
  },
  'drusen': {
    name: 'Drusen Deposits',
    severity: 'medium',
    description: 'Yellow deposits under the retina, early sign of age-related macular degeneration',
    recommendations: 'Regular monitoring recommended. Consider AREDS supplements and lifestyle modifications.'
  },
  'normal': {
    name: 'Normal Retina',
    severity: 'low',
    description: 'No significant pathological findings detected',
    recommendations: 'Continue regular eye examinations as per standard screening guidelines.'
  }
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, imageData, analysisType = 'comprehensive' } = await req.json();
    
    if (!imageUrl && !imageData) {
      return new Response(
        JSON.stringify({ error: 'Either imageUrl or imageData is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const messages = [
      {
        role: "system",
        content: `You are an expert retinal imaging AI assistant specialized in OCT and fundus image analysis. 

CRITICAL: You are NOT providing medical diagnosis. You are an educational tool that helps identify potential findings for healthcare professionals.

Your analysis should include:
1. Image quality assessment
2. Anatomical structure identification
3. Potential pathological findings detection
4. Confidence scores for each finding
5. Educational information about detected conditions

Focus on these retinal conditions:
- CNV (Choroidal Neovascularization)
- DME (Diabetic Macular Edema) 
- Drusen deposits
- Normal retinal anatomy

For each finding, provide:
- Confidence level (0-100%)
- Location if applicable
- Severity assessment
- Educational context

Always include medical disclaimers and recommend professional consultation.`
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Please analyze this retinal image (${analysisType} analysis). Provide detailed findings with confidence scores, anatomical observations, and educational information. Remember this is for educational purposes only.`
          },
          {
            type: "image_url",
            image_url: {
              url: imageUrl || `data:image/jpeg;base64,${imageData}`,
              detail: "high"
            }
          }
        ]
      }
    ];

    console.log('Sending request to OpenAI Vision API for retinal analysis...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysisText = data.choices[0].message.content;

    // Enhanced analysis with structured output
    const analysisResult = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      analysisType,
      findings: {
        primary: extractPrimaryFindings(analysisText),
        confidence: extractConfidenceScores(analysisText),
        severity: assessSeverity(analysisText),
        location: extractLocation(analysisText)
      },
      recommendations: extractRecommendations(analysisText),
      educational: {
        anatomy: extractAnatomicalNotes(analysisText),
        conditions: getConditionEducation(analysisText)
      },
      qualityMetrics: {
        imageQuality: extractImageQuality(analysisText),
        analysisReliability: calculateReliability(analysisText)
      },
      fullAnalysis: analysisText,
      disclaimer: "This analysis is for educational purposes only and does not constitute medical diagnosis. Please consult with a qualified healthcare professional for medical advice."
    };

    console.log('Retinal analysis completed successfully');

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in retinal-diagnosis function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Analysis failed', 
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function extractPrimaryFindings(text: string): string[] {
  const findings = [];
  if (text.toLowerCase().includes('cnv') || text.toLowerCase().includes('choroidal neovascularization')) {
    findings.push('CNV');
  }
  if (text.toLowerCase().includes('dme') || text.toLowerCase().includes('diabetic macular edema')) {
    findings.push('DME');
  }
  if (text.toLowerCase().includes('drusen')) {
    findings.push('Drusen');
  }
  if (text.toLowerCase().includes('normal') && findings.length === 0) {
    findings.push('Normal');
  }
  return findings.length > 0 ? findings : ['Requires further evaluation'];
}

function extractConfidenceScores(text: string): { [key: string]: number } {
  const confidencePattern = /(\w+).*?(\d{1,2})%/g;
  const scores: { [key: string]: number } = {};
  let match;
  
  while ((match = confidencePattern.exec(text)) !== null) {
    scores[match[1]] = parseInt(match[2]);
  }
  
  return scores;
}

function assessSeverity(text: string): 'low' | 'medium' | 'high' {
  if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('immediate')) {
    return 'high';
  }
  if (text.toLowerCase().includes('monitor') || text.toLowerCase().includes('follow')) {
    return 'medium';
  }
  return 'low';
}

function extractLocation(text: string): string {
  const locationTerms = ['macula', 'fovea', 'optic disc', 'peripheral', 'central', 'temporal', 'nasal'];
  const foundLocations = locationTerms.filter(term => 
    text.toLowerCase().includes(term)
  );
  return foundLocations.join(', ') || 'Not specified';
}

function extractRecommendations(text: string): string[] {
  const recommendations = [];
  if (text.toLowerCase().includes('specialist') || text.toLowerCase().includes('ophthalmologist')) {
    recommendations.push('Ophthalmologist consultation recommended');
  }
  if (text.toLowerCase().includes('monitor')) {
    recommendations.push('Regular monitoring advised');
  }
  if (text.toLowerCase().includes('urgent') || text.toLowerCase().includes('immediate')) {
    recommendations.push('Urgent medical attention required');
  }
  return recommendations.length > 0 ? recommendations : ['Standard follow-up care'];
}

function extractAnatomicalNotes(text: string): string {
  const anatomyTerms = ['retinal layers', 'photoreceptors', 'rpe', 'choroid', 'vitreous'];
  const foundTerms = anatomyTerms.filter(term => 
    text.toLowerCase().includes(term)
  );
  return foundTerms.length > 0 
    ? `Anatomical structures identified: ${foundTerms.join(', ')}` 
    : 'Standard retinal anatomy observed';
}

function getConditionEducation(text: string): { [key: string]: any } {
  const education: { [key: string]: any } = {};
  
  Object.entries(RETINAL_CONDITIONS).forEach(([key, condition]) => {
    if (text.toLowerCase().includes(key) || text.toLowerCase().includes(condition.name.toLowerCase())) {
      education[key] = condition;
    }
  });
  
  return education;
}

function extractImageQuality(text: string): string {
  if (text.toLowerCase().includes('poor quality') || text.toLowerCase().includes('blurry')) {
    return 'Poor';
  }
  if (text.toLowerCase().includes('excellent') || text.toLowerCase().includes('high quality')) {
    return 'Excellent';
  }
  return 'Good';
}

function calculateReliability(text: string): number {
  let reliability = 85; // Base reliability
  
  if (text.toLowerCase().includes('clear') || text.toLowerCase().includes('distinct')) {
    reliability += 10;
  }
  if (text.toLowerCase().includes('unclear') || text.toLowerCase().includes('artifact')) {
    reliability -= 15;
  }
  
  return Math.max(50, Math.min(95, reliability));
}