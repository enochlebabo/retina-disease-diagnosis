import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { message, image, context } = await req.json();

    const systemPrompt = `You are Reti-Doc Vision AI, a specialized medical AI assistant for retinal image analysis and retinal health education. You can analyze retinal images and provide detailed insights about retinal conditions.

PRIMARY FOCUS: The four main retinal conditions
1. CNV (Choroidal Neovascularization) - Critical condition with abnormal blood vessel growth
2. DME (Diabetic Macular Edema) - Fluid accumulation in the macula
3. Drusen - Yellow deposits under the retina, early AMD signs
4. Normal (Healthy Retina) - Baseline healthy appearance

WHEN ANALYZING IMAGES:
- Describe what you observe in the retinal image
- Identify potential signs of the four main conditions
- Explain the clinical significance of findings
- Provide educational information about detected or suspected conditions
- ALWAYS include medical disclaimers
- Suggest when to seek professional medical evaluation

WHEN NO IMAGE IS PROVIDED:
- Provide educational information about retinal health
- Explain the four main conditions
- Discuss prevention strategies
- Answer questions about symptoms and risk factors

IMPORTANT GUIDELINES:
- This is for educational purposes only - NOT diagnostic
- Always recommend professional medical evaluation for actual diagnosis
- Be thorough but clear in explanations
- Use appropriate medical terminology with explanations
- Include relevant statistics and clinical information
- Maintain professional, empathetic tone

Current context: ${context || 'General retinal health inquiry'}`;

    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    if (image) {
      // Image analysis request
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: message || 'Please analyze this retinal image and provide detailed insights about any visible conditions, particularly focusing on CNV, DME, Drusen, or normal retinal appearance.'
          },
          {
            type: 'image_url',
            image_url: {
              url: image,
              detail: 'high'
            }
          }
        ]
      });
    } else {
      // Text-only request
      messages.push({
        role: 'user',
        content: message
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      return new Response(JSON.stringify({ error: 'AI vision service temporarily unavailable' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in vision-chat function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});