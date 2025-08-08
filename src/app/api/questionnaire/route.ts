import { getXcavateQuestions } from '@/lib/question.model';
import { NextResponse } from 'next/server';

import { NextRequest } from 'next/server';

// GET Handler
export async function GET(req: NextRequest) {
  try {
    // Default → return questions
    return NextResponse.json(
      {
        error: false,
        data: 'Questions retrieved successfully',
        code: 200,
        result: getXcavateQuestions()
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      {
        error: true,
        data: 'Failed to fetch data',
        code: 500,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
