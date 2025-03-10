// app/api/admin/posts/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Create a new blog post or save a draft
export async function POST(request: Request) {
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
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.slug) {
      return NextResponse.json(
        { error: 'Title and slug are required' }, 
        { status: 400 }
      );
    }
    
    // Check for slug uniqueness in the default language
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });
    
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' }, 
        { status: 409 }
      );
    }
    
    // Create the post in the database for metadata
    const post = await prisma.post.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        image: data.image || '',
        category: data.category || '',
        author: data.author || (session?.user?.name || 'Admin'),
        published: data.published || false,
        language: data.language || 'en',
        translationSlugs: data.translationSlugs || {},
      },
    });
    
    // Create the physical markdown file if the post is published
    if (data.published) {
      // Ensure directories exist
      const languageDir = path.join(process.cwd(), 'blog', data.language || 'en');
      const postDir = path.join(languageDir, data.slug);
      
      if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir, { recursive: true });
      }
      
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      
      // Create front matter data
      const frontMatter = {
        title: data.title,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || (session?.user?.name || 'Admin'),
        description: data.description || '',
        image: data.image || '',
        category: data.category || '',
        readTime: data.readTime || 5,
        tags: data.tags || [],
        featured: data.featured || false,
        toc: true,
        translationSlug: data.translationSlugs || {},
      };
      
      // Create the markdown file
      const fileContent = matter.stringify(data.content || '', frontMatter);
      fs.writeFileSync(path.join(postDir, 'index.md'), fileContent);
      
      // Handle translations if provided
      if (data.translations) {
        for (const [lang, translation] of Object.entries(data.translations)) {
          if (lang === data.language) continue;
          
          const transData = translation as any;
          if (!transData.title || !transData.slug) continue;
          
          // Ensure translation directories exist
          const transLangDir = path.join(process.cwd(), 'blog', lang);
          const transPostDir = path.join(transLangDir, transData.slug);
          
          if (!fs.existsSync(transLangDir)) {
            fs.mkdirSync(transLangDir, { recursive: true });
          }
          
          if (!fs.existsSync(transPostDir)) {
            fs.mkdirSync(transPostDir, { recursive: true });
          }
          
          // Create translation front matter
          const transFrontMatter = {
            title: transData.title,
            date: transData.date || data.date || new Date().toISOString().split('T')[0],
            author: transData.author || data.author || (session?.user?.name || 'Admin'),
            description: transData.description || '',
            image: transData.image || data.image || '',
            category: transData.category || data.category || '',
            readTime: transData.readTime || data.readTime || 5,
            tags: transData.tags || data.tags || [],
            featured: transData.featured || data.featured || false,
            toc: true,
            translationSlug: data.translationSlugs || {},
          };
          
          // Create the translation markdown file
          const transFileContent = matter.stringify(transData.content || '', transFrontMatter);
          fs.writeFileSync(path.join(transPostDir, 'index.md'), transFileContent);
        }
      }
    }
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post: ' + (error instanceof Error ? error.message : 'Unknown error') }, 
      { status: 500 }
    );
  }
}

// Get all blog posts with pagination and filtering
export async function GET(request: Request) {
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
  
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || undefined;
  const language = searchParams.get('language') || 'en';
  const published = searchParams.get('published');
  
  const skip = (page - 1) * limit;
  
  try {
    // Build filter conditions
    const where: any = { language };
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (published === 'true') {
      where.published = true;
    } else if (published === 'false') {
      where.published = false;
    }
    
    // Execute query with filters and pagination
    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          image: true,
          category: true,
          author: true,
          published: true,
          language: true,
          translationSlugs: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);
    
    // Calculate pagination details
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = page < totalPages;
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}