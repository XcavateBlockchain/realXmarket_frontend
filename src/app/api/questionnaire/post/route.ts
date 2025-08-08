import { questionnaireService } from '@/lib/questionnaire.service';
import { NextRequest, NextResponse } from 'next/server';

// POST Handler
export async function POST(req: NextRequest) {
  try {
    const { userId, account_address, questions } = await req.json();

    if (!account_address || !questions || !Array.isArray(questions)) {
      return NextResponse.json(
        {
          error: true,
          data: 'Invalid request body',
          code: 400,
          details: 'Invalid request body'
        },
        { status: 400 }
      );
    }

    const response = await questionnaireService.saveQuestionnaireResponse({
      userId,
      account_address,
      questions
    });

    return NextResponse.json(
      { error: false, data: 'Response saved successfully', code: 201, result: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: true,
        data: 'Failed to save response',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
