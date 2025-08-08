import { questionnaireService } from '@/lib/questionnaire.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    const userId = searchParams.get('userId');

    if (address) {
      const response = await questionnaireService.getQuestionnaireResponse(address);

      if (!response) {
        return NextResponse.json(
          {
            error: true,
            data: 'Response not found',
            code: 404,
            details: 'Response not found'
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: false, data: 'Response retrieved successfully', code: 200, result: response },
        { status: 200 }
      );
    }

    if (userId) {
      const response = await questionnaireService.getResponsesByUser(userId);

      if (!response) {
        return NextResponse.json(
          {
            error: true,
            data: 'Response not found',
            code: 404,
            details: 'Response not found'
          },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: false, data: 'Response retrieved successfully', code: 200, result: response },
        { status: 200 }
      );
    }

    const responses = await questionnaireService.getAllQuestionnaireResponses();

    return NextResponse.json(
      { error: false, data: 'Responses retrieved successfully', code: 200, result: responses },
      { status: 200 }
    );
  } catch (error) {
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
