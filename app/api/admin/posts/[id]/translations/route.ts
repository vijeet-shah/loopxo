// app/api/admin/posts/[id]/translations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { SupportedLanguage } from '@/lib/i18n/types';

// Get all translations for a post
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
  
  // IMPORTANT: Get the ID directly from context.params - DO NOT use await
  const id = context.params.id;
  
  try {
    // Get the post with its metadata
    const post = await prisma.post.findUnique({
      where: { id },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Build response with base post data
    const response = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      language: post.language,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      translationSlugs: post.translationSlugs || {},
      translations: {} as Record<string, any>,
    };
    
    // Read translation slugs from post metadata
    if (post.translationSlugs) {
      for (const [lang, slug] of Object.entries(post.translationSlugs as Record<string, string>)) {
        if (lang === post.language) continue;
        
        // Try to get translation from database or file system
        try {
          // First check in database
          const translation = await prisma.post.findFirst({
            where: {
              language: lang as SupportedLanguage,
              slug: slug as string,
            },
          });
          
          if (translation) {
            response.translations[lang] = {
              title: translation.title,
              slug: translation.slug,
              published: translation.published,
              updatedAt: translation.updatedAt,
            };
            continue;
          }
          
          // If not in database, try file system
          const filePath = path.join(process.cwd(), 'blog', lang, slug as string, 'index.md');
          
          if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            
            response.translations[lang] = {
              title: data.title || '',
              slug: slug,
              published: true, // If file exists, consider it published
              updatedAt: new Date().toISOString(), // Use current date as fallback
            };
          }
        } catch (error) {
          console.error(`Error loading translation for ${lang}:`, error);
          // Skip this translation if there's an error
        }
      }
    }
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching translations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch translations: ' + (error instanceof Error ? error.message : 'Unknown error') }, 
      { status: 500 }
    );
  }
}