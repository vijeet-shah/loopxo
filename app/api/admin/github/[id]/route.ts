// app/api/admin/github/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';

// Get GitHub status for a specific post
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  // Check for NextAuth session
  const session = await getServerSession(authOptions);
  
  // Also check for adminToken cookie
  const cookieStore = request.cookies;
  const adminToken = cookieStore.get('adminToken');
  
  // Allow the request if either authentication method works
  if (!session && (!adminToken || adminToken.value !== 'true')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    // Get the ID from context
    const id = context.params.id;
    
    // Get the post
    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        githubPrUrl: true,
        githubPrNumber: true,
        published: true,
        githubMerged: true,
        githubMergedAt: true,
      },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      githubPrUrl: post.githubPrUrl,
      githubPrNumber: post.githubPrNumber,
      published: post.published,
      githubMerged: post.githubMerged,
      githubMergedAt: post.githubMergedAt,
    });
  } catch (error) {
    console.error('Error checking GitHub status:', error);
    return NextResponse.json(
      { error: 'Failed to check GitHub status: ' + (error instanceof Error ? error.message : 'Unknown error') }, 
      { status: 500 }
    );
  }
}