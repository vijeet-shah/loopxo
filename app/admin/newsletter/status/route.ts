import { NextRequest, NextResponse } from 'next/server';
import { getSubscriptionStatus } from '@/lib/resend';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const status = await getSubscriptionStatus(email);
    
    return NextResponse.json({
      email,
      subscribed: status?.subscribed || false
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error checking subscription status:', error.message);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to check subscription status' },
      { status: 500 }
    );
  }
}