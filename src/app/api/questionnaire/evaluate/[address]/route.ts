import { questionnaireService } from '@/lib/questionnaire.service';
import { NextRequest, NextResponse } from 'next/server';

// POST Handler
export async function PUT(req: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params;

    if (!address) {
      return NextResponse.json(
        {
          error: true,
          data: 'Address is required',
          code: 400,
          details: 'Address is required'
        },
        { status: 400 }
      );
    }

    const response = await questionnaireService.evaluateQuestionnaireResponse(address);

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
