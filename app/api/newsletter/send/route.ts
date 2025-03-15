// app/api/newsletter/send/route.ts
import { NextResponse } from 'next/server';
import { getHostURL, sendNewsletterMail } from '@/lib/resend';
import dotenv from 'dotenv';

dotenv.config();

export async function POST(request: Request) {
  try {
    console.log('Newsletter send request received');
    
    const data = await request.json();
    console.log('Newsletter data:', data);
    
    const { title, content, image, slug } = data;
    
    // Validate required fields
    if (!title || !content || !slug) {
      console.log('Missing required fields');
      return NextResponse.json({ 
        success: false, 
        message: 'Missing required fields for newsletter' 
      }, { status: 400 });
    }
    
    // Prepare newsletter data
    const newsletterData = {
      subject: `New Post - ${title}`,
      post: {
        title: title,
        teaser: content.substring(0, 150) + '...',
        link: `${getHostURL()}/${slug}`,
        image: image || '/images/default-post-image.jpg',
      },
    };
    
    // Send the newsletter
    console.log('Sending newsletter with data:', newsletterData);
    const result = await sendNewsletterMail(newsletterData);
    console.log('Newsletter send result:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Newsletter sent successfully'
    }, { status: 200 });
    
  } catch (error: any) {
    console.error('Failed to send newsletter:', error);
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to send newsletter'
    }, { status: 500 });
  }
}