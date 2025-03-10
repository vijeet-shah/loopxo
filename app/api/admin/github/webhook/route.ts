// app/api/github/webhook/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { triggerBuild } from '@/lib/github';
import crypto from 'crypto';

// Verify GitHub webhook signature
function verifySignature(payload: string, signature: string): boolean {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('GitHub webhook secret not configured!');
    return false;
  }
  
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}

export async function POST(request: Request) {
  // Get the raw request body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get('x-hub-signature-256') || '';
  
  // Verify the signature (only in production)
  if (process.env.NODE_ENV === 'production' && !verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
  }
  
  try {
    const data = JSON.parse(rawBody);
    
    // Handle different webhook events
    const event = request.headers.get('x-github-event');
    
    if (event === 'pull_request') {
      const { action, pull_request } = data;
      
      // Handle merged PRs
      if (action === 'closed' && pull_request.merged) {
        // Extract post ID from branch name (assuming format: post-{id}-{timestamp})
        const branchMatch = pull_request.head.ref.match(/^post-([a-f0-9-]+)-\d+$/);
        
        if (branchMatch && branchMatch[1]) {
          const postId = branchMatch[1];
          
          // Update post status in database
          await prisma.post.update({
            where: { id: postId },
            data: {
              githubMerged: true,
              githubMergedAt: new Date(),
            },
          });
          
          // Trigger a build after merge
          await triggerBuild();
          
          return NextResponse.json({
            success: true,
            message: 'PR merged, build triggered',
            postId,
          });
        }
      }
    }
    
    // Default response for unhandled events
    return NextResponse.json({
      success: true,
      message: 'Webhook received',
      event,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook: ' + (error instanceof Error ? error.message : 'Unknown error') }, 
      { status: 500 }
    );
  }
}