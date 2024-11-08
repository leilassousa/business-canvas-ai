// src/lib/anthropic.ts

import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing ANTHROPIC_API_KEY environment variable');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeBusiness(formData: Record<string, string>) {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      temperature: 0.7,
      system: `You are a seasoned business consultant tasked with analyzing business plans and providing actionable insights. 
               Analyze the provided information and generate a comprehensive report following a structured format.
               Focus on practical, actionable recommendations.`,
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

    // Fixed return to handle the content properly
    return message.content[0].text;
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}