// app/api/newsletter/subscribe/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get email from request body
    const { email, firstName } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // ConvertKit API credentials - store these in .env.local
    const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    const API_URL = `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`;

    // Post to ConvertKit API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: CONVERTKIT_API_KEY,
        email,
        first_name: firstName || '',
      }),
    });

    const data = await response.json();

    // Handle ConvertKit API errors
    if (!response.ok) {
      console.error('ConvertKit API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe to newsletter' },
        { status: response.status }
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}