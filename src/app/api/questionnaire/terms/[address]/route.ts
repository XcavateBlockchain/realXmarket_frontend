import { questionnaireService } from '@/lib/questionnaire.service';
import { NextRequest, NextResponse } from 'next/server';

// POST Handler
export async function PUT(req: NextRequest, { params }: { params: { address: string } }) {
  try {
    const { address } = params;

    const { hasAgreedToTerms } = await req.json();

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

    const response = await questionnaireService.acceptTermsAndUpdateUser(
      address,
      hasAgreedToTerms
    );

    if (!response) {
      return NextResponse.json(
        {
          error: true,
          data: 'Failed to save response',
          details: 'Failed to save response'
        },
        { status: 500 }
      );
    }

    let message: string;

    if (response.hasAgreedToTerms === false) {
      message =
        'Sorry but you have not passed our questionnaire and you are not suitable for this type of investment';
    } else {
      message = 'Thanks for passing our questionnaire, Terms accepted successfully';
    }

    return NextResponse.json(
      {
        error: false,
        data: 'Response saved successfully',
        code: 201,
        result: {
          ...response,
          message
        }
      },
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
