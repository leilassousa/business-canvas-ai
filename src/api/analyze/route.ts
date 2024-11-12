// src/app/api/analyze/route.ts
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function analyzeBusiness(formData: Record<string, string>) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      temperature: 0.7,
      messages: [{
        role: "user",
        content: `Please analyze this business information and create a detailed report:
        
        ${Object.entries(formData)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n\n')}
        
        Generate a comprehensive report with these sections:
        1. Executive Summary
        2. Problem Analysis
        3. Target Audience Profile
        4. Competitive Landscape
        5. Marketing and Communication Channels
        6. Elevator Pitch and USP
        7. Solution Overview
        8. Financial Overview: Costs and Revenue
        9. Business Advantages and Growth Opportunities
        10. Personal Fit and Long-Term Vision`
      }]
    });

    const content = message.content[0];
    if (content && 'text' in content) {
      return content.text;
    }
    throw new Error('Unexpected response format from Claude');

  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    // Changed headers handling
    const headersList = headers();
    const authHeader = headersList.get('authorization') || '';  // Using OR operator instead

    if (authHeader !== `Bearer ${process.env.PASSWORD}`) {
      console.log('Auth failed. Expected:', process.env.PASSWORD);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await req.json();
    console.log('Received form data:', formData);

    const analysis = await analyzeBusiness(formData);
    console.log('Analysis generated:', analysis.substring(0, 100) + '...');

    return NextResponse.json({ analysis });
    
  } catch (error) {
    console.error('Error in analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze business data' },
      { status: 500 }
    );
  }
}