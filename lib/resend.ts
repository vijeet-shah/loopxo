// app/lib/resend.ts
import { Resend } from 'resend';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export function getHostURL() {
  return process.env.HOST || 'http://localhost:3000';
}

export function getConfirmationURL(email: string, confirmationCode: string) {
  const hostURL = getHostURL();
  const urlParams = new URLSearchParams({
    confirmationCode: confirmationCode,
    email: email,
  });
  const confirmationURL = `${hostURL}/confirm-subscription?${urlParams}`;
  return confirmationURL;
}

// Add email to subscribers list
export async function addToSubscribersList(email: string) {
  try {
    console.log(`Adding ${email} to subscribers list`);
    
    // Generate confirmation code
    const confirmationCode = crypto.randomBytes(32).toString('hex');
    
    // Store in database
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: { 
        confirmationCode,
        // Don't change subscription status if already exists
      },
      create: {
        email,
        confirmationCode,
        subscribed: false
      }
    });
    
    console.log(`Stored subscriber data for ${email}`);
    return { success: true, confirmationCode: subscriber.confirmationCode };
  } catch (error: any) {
    console.error('Error adding to subscribers list:', error);
    throw new Error(error.message || 'Failed to add your email to the subscriber\'s list');
  }
}

// Get subscription status
export async function getSubscriptionStatus(email: string) {
  try {
    console.log(`Getting subscription status for ${email}`);
    const subscriber = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (!subscriber) {
      return null;
    }
    
    return {
      email,
      confirmationCode: subscriber.confirmationCode,
      subscribed: subscriber.subscribed
    };
  } catch (error) {
    console.error('Error getting subscription status:', error);
    return null;
  }
}

// Send confirmation email
export async function sendSubscriptionConfirmationMail(email: string, confirmationURL: string) {
  try {
    console.log('Sending confirmation email to:', email);
    console.log('Confirmation URL:', confirmationURL);
    
    const senderEmail = process.env.RESEND_SENDER_EMAIL;
    if (!senderEmail) {
      throw new Error('RESEND_SENDER_EMAIL not configured');
    }
    
    const { data, error } = await resend.emails.send({
      from: `Newsletter <${senderEmail}>`,
      to: [email],
      subject: 'Confirm newsletter subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Confirm Your Subscription</h2>
          <p>We are delighted to have you as a new subscriber to our newsletter.</p>
          <p>To finalize your subscription, kindly confirm it by clicking on the following link:</p>
          <p><a href="${confirmationURL}" style="display: inline-block; padding: 10px 20px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">Confirm Subscription</a></p>
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p>${confirmationURL}</p>
          <p>Thank you for joining our community!</p>
        </div>
      `,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log('Email sent successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Resend error:', error);
    throw new Error(error.message || 'Failed to send confirmation email');
  }
}

// Confirm subscription
export async function confirmSubscription(email: string, confirmationCode: string) {
  try {
    console.log(`Confirming subscription for ${email}`);
    
    const subscriber = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (!subscriber) {
      throw new Error('This email does not exist in our mailing list');
    }
    
    if (subscriber.confirmationCode !== confirmationCode) {
      throw new Error('Confirmation code is invalid');
    }
    
    if (subscriber.subscribed) {
      return {
        emailConfirmed: true,
        message: 'You\'re already subscribed to the newsletter!',
      };
    }
    
    // Update subscription status
    await prisma.subscriber.update({
      where: { email },
      data: {
        subscribed: true,
        confirmedAt: new Date()
      }
    });
    
    return {
      emailConfirmed: true,
      message: 'You\'ve successfully subscribed to the newsletter!',
    };
  } catch (error: any) {
    console.error('Error confirming subscription:', error);
    return {
      emailConfirmed: false,
      message: error.message || 'Failed to confirm your subscription',
    };
  }
}

// Remove from subscribers list
export async function removeFromSubscribersList(email: string, confirmationCode: string) {
  try {
    console.log(`Removing subscription for ${email}`);
    
    const subscriber = await prisma.subscriber.findUnique({
      where: { email }
    });
    
    if (!subscriber) {
      throw new Error('This email does not exist in our mailing list');
    }
    
    if (subscriber.confirmationCode !== confirmationCode) {
      throw new Error('Confirmation code is invalid');
    }
    
    // Remove from database
    await prisma.subscriber.delete({
      where: { email }
    });
    
    return {
      unsubscribed: true,
      message: 'You have been successfully unsubscribed.',
    };
  } catch (error: any) {
    console.error('Error removing subscription:', error);
    return {
      unsubscribed: false,
      message: error.message || 'Sorry, we couldn\'t process your unsubscription request.',
    };
  }
}

// Send newsletter
export async function sendNewsletterMail({ subject, post }: { 
  subject: string, 
  post: {
    title: string;
    teaser: string;
    link: string;
    image: string;
  }
}) {
  try {
    console.log('Sending newsletter');
    
    // Get subscribed users from database
    const subscribers = await prisma.subscriber.findMany({
      where: { subscribed: true }
    });
    
    if (subscribers.length === 0) {
      console.log('No subscribed users to send to');
      return { success: true, message: 'No subscribers to send to' };
    }
    
    const senderEmail = process.env.RESEND_SENDER_EMAIL;
    if (!senderEmail) {
      throw new Error('RESEND_SENDER_EMAIL not configured');
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    // Send to each subscribed user
    for (const subscriber of subscribers) {
      try {
        // Create newsletter HTML with personalized unsubscribe link
        const unsubscribeUrl = `${getHostURL()}/unsubscribe?confirmationCode=${subscriber.confirmationCode}&email=${subscriber.email}`;
        
        const newsletterHtml = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${post.title}</title>
              <style>
                  body, p, h1, h2, h3, h4, h5, h6 {
                      margin: 0;
                      padding: 0;
                  }
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      color: #333333;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #f7f7f7;
                  }
                  .header {
                      text-align: center;
                      padding: 10px;
                      background-color: #eaeaea;
                  }
                  .content {
                      padding: 20px;
                      background-color: #ffffff;
                  }
                  .footer {
                      text-align: center;
                      padding: 10px;
                      background-color: #eaeaea;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>${post.title}</h1>
                  </div>
                  <div class="content">
                      <img src="${post.image}" alt="Blog Image" style="max-width: 100%; height: auto;">
                      <p>${post.teaser} Click the link below to read the full article.</p>
                      <p><a href="${post.link}">Read more</a></p>
                  </div>
                  <div class="footer">
                      <p>Want to unsubscribe? <a href="${unsubscribeUrl}">Click here</a>.</p>
                  </div>
              </div>
          </body>
          </html>
        `;
        
        const {  error } = await resend.emails.send({
          from: `Newsletter <${senderEmail}>`,
          to: [subscriber.email],
          subject: subject,
          html: newsletterHtml,
        });
        
        if (error) {
          throw new Error(error.message);
        }
        
        successCount++;
        console.log(`Newsletter sent to ${subscriber.email}`);
      } catch (error) {
        errorCount++;
        console.error(`Failed to send to ${subscriber.email}:`, error);
      }
    }
    
    return { 
      success: true, 
      message: `Newsletter sent to ${successCount} subscribers. Failed: ${errorCount}` 
    };
  } catch (error: any) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
}