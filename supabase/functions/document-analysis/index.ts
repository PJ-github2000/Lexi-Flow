import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const { 
      documentText, 
      analysisType, 
      fileName,
      model = 'google/gemini-2.5-flash'
    } = await req.json();

    const authHeader = req.headers.get('Authorization');
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
      { global: { headers: { Authorization: authHeader! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    console.log('Analyzing document with model:', model);

    let systemPrompt = '';
    let userPrompt = '';

    switch (analysisType) {
      case 'summarize':
        systemPrompt = 'You are an expert legal document analyst. Provide a clear, concise summary of legal documents that highlights key points, parties involved, main obligations, and critical dates or deadlines.';
        userPrompt = `Please summarize this legal document:\n\n${documentText}`;
        break;
      case 'clauses':
        systemPrompt = 'You are an expert legal document analyst. Extract and identify key clauses from legal documents, explaining their significance and potential impact.';
        userPrompt = `Please extract and analyze the key clauses from this legal document:\n\n${documentText}`;
        break;
      case 'risk':
        systemPrompt = 'You are an expert legal risk analyst. Identify potential risks, liabilities, and concerns in legal documents. Categorize risks by severity (high, medium, low) and provide recommendations.';
        userPrompt = `Please conduct a risk analysis of this legal document:\n\n${documentText}`;
        break;
      case 'compare':
        systemPrompt = 'You are an expert legal document analyst. Compare multiple documents to identify differences, similarities, and potential conflicts or inconsistencies.';
        userPrompt = `Please analyze and compare this legal document:\n\n${documentText}`;
        break;
      default:
        systemPrompt = 'You are an expert legal document analyst. Provide comprehensive analysis of legal documents.';
        userPrompt = `Please analyze this legal document:\n\n${documentText}`;
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices?.[0]?.message?.content;

    console.log('Document analysis completed successfully');

    return new Response(
      JSON.stringify({ analysis, fileName }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in document-analysis function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});