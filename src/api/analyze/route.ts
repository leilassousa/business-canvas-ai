// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { analyzeBusiness } from '@/lib/anthropic';

export async function POST(request: NextRequest) {
  try {
    // Basic password protection check
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.PASSWORD}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get form data from request body
    const formData = await request.json();

    // Call Anthropic API
    const analysis = await analyzeBusiness(formData);

    // Return the analysis
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze business data' },
      { status: 500 }
    );
  }
}