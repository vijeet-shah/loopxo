// app/api/admin/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check for NextAuth session
  const session = await getServerSession(authOptions);
  
  // Also check for adminToken cookie
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader?.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>) || {};
  
  const adminToken = cookies['adminToken'];
  
  // Allow the request if either authentication method works
  if (!session && (!adminToken || adminToken !== 'true')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const id = params.id;
    
    // Get the requested fields from query params
    const { searchParams } = new URL(request.url);
    const fields = searchParams.get('fields')?.split(',');
    
    // Fetch the post from database
    const post = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // If fields are specified, return only those fields
    if (fields && fields.length > 0) {
      const filteredPost: Record<string, any> = {};
      
      for (const field of fields) {
        if (field in post) {
          filteredPost[field] = (post as any)[field];
        }
      }
      
      return NextResponse.json(filteredPost);
    }
    
    // Otherwise return the full post
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post data' }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check for NextAuth session
  const session = await getServerSession(authOptions);
  
  // Also check for adminToken cookie
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader?.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>) || {};
  
  const adminToken = cookies['adminToken'];
  
  // Allow the request if either authentication method works
  if (!session && (!adminToken || adminToken !== 'true')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const id = params.id;
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' }, 
        { status: 400 }
      );
    }
    
    // Check if slug already exists for another post
    if (data.slug) {
      const existingPost = await prisma.post.findFirst({
        where: {
          slug: data.slug,
          id: { not: id }
        },
      });
      
      if (existingPost) {
        return NextResponse.json(
          { error: 'Another post with this slug already exists' }, 
          { status: 409 }
        );
      }
    }
    
    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        content: data.content || '',
        image: data.image || '',
        category: data.category || '',
        author: data.author || session?.user?.name || 'Admin',
        published: data.published || false,
        language: data.language || 'en',
        translationSlugs: data.translationSlugs || {},
        updatedAt: new Date(),
      },
    });
    
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check for NextAuth session
  const session = await getServerSession(authOptions);
  
  // Also check for adminToken cookie
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader?.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    if (key && value) acc[key] = value;
    return acc;
  }, {} as Record<string, string>) || {};
  
  const adminToken = cookies['adminToken'];
  
  // Allow the request if either authentication method works
  if (!session && (!adminToken || adminToken !== 'true')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const id = params.id;
    
    // Delete the post
    await prisma.post.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' }, 
      { status: 500 }
    );
  }
}