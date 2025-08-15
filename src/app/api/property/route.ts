import { propertyService } from '@/lib/properties.service';
import { NextRequest, NextResponse } from 'next/server';

// POST Handler
export async function POST(req: NextRequest) {
  try {
    const { address, data } = await req.json();

    if (!address || !data) {
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

    const response = await propertyService.upsertProperty(address, data);

    return NextResponse.json(
      { error: false, data: 'Response saved successfully', code: 201, result: response },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
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
