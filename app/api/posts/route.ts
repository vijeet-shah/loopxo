// app/api/posts/route.ts
import {  NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/api';
import { getLanguage } from '@/lib/i18n/server-utils';
import { SupportedLanguage } from '@/lib/i18n/types';

export async function GET() {
  try {
    const currentLanguage = await getLanguage() as SupportedLanguage;
    
    // Get all posts using the server-side function
    const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'description',
      'image',
      'category',
      'readTime',
    ], { language: currentLanguage });
    
    return NextResponse.json({
      posts: allPosts,
      featuredPost: allPosts.length > 0 ? allPosts[0] : null,
      recentPosts: allPosts.slice(1, 6)
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}