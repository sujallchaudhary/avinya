import { NextRequest, NextResponse } from 'next/server';
import { analyzePoemWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { poemTitle, poemContent, userQuery } = await request.json();
    
    if (!poemTitle || !poemContent || !userQuery) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }
    
    const analysis = await analyzePoemWithGemini(poemTitle, poemContent, userQuery);
    
    return NextResponse.json({ response: analysis });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
