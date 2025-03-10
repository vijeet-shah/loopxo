import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import { publishToGitHub } from '@/lib/github';

// Publish post to GitHub
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const id = params.id;
  
  try {
    // Get post to publish
    const post = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Ensure post is marked as published in database
    if (!post.published) {
      await prisma.post.update({
        where: { id },
        data: { published: true },
      });
    }
    
    // Publish to GitHub
    const result = await publishToGitHub(id);
    
    // Update post with GitHub PR info
    await prisma.post.update({
      where: { id },
      data: {
        // Add fields to your schema
        buildStatus: 'building',
        pullRequestUrl: result.pullRequestUrl,
        pullRequestNumber: result.pullRequestNumber,
      },
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error publishing post:', error);
    return NextResponse.json(
      { error: 'Failed to publish post' }, 
      { status: 500 }
    );
  }
}