// app/api/newsletter/subscribe/route.ts
import { NextResponse } from 'next/server';
import { 
  addToSubscribersList, 
  getSubscriptionStatus, 
  getConfirmationURL, 
  sendSubscriptionConfirmationMail 
} from '@/lib/resend';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request: Request) {
  try {
    console.log('Newsletter subscription request received');
    
    // Get email from request body
    const { email } = await request.json();
    console.log('Email:', email);

    // Validate email
    if (!email || !email.includes('@')) {
      console.log('Invalid email format');
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if the email is already subscribed
    const subscriptionStatus = await getSubscriptionStatus(email);
    console.log('Subscription status:', subscriptionStatus);
    
    if (subscriptionStatus) {
      const { confirmationCode, subscribed } = subscriptionStatus;
      
      if (subscribed) {
        console.log('Email already subscribed');
        return NextResponse.json({
          success: true,
          message: "You've already subscribed to the newsletter",
        }, { status: 200 });
      } else {
        // Email exists but not confirmed, send confirmation again
        console.log('Sending confirmation email again');
        const confirmationURL = getConfirmationURL(email, confirmationCode);
        await sendSubscriptionConfirmationMail(email, confirmationURL);
        
        return NextResponse.json({
          success: true,
          message: "Go to your mailbox to confirm your newsletter subscription",
        }, { status: 200 });
      }
    } else {
      // New subscriber, add to list and send confirmation
      console.log('New subscriber, adding to list');
      const { confirmationCode } = await addToSubscribersList(email);
      const confirmationURL = getConfirmationURL(email, confirmationCode);
      
      console.log('Sending confirmation email');
      await sendSubscriptionConfirmationMail(email, confirmationURL);
      
      return NextResponse.json({
        success: true,
        message: "Go to your mailbox to confirm your newsletter subscription",
      }, { status: 200 });
    }

  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}