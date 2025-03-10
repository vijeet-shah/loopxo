// app/api/admin/github/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

// Initialize GitHub client with your token
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

// Configuration from environment variables
const config = {
  owner: process.env.GITHUB_REPO_OWNER || '',
  repo: process.env.GITHUB_REPO_NAME || '',
  baseBranch: process.env.GITHUB_BASE_BRANCH || 'main',
  contentPath: 'blog',
};

// Handle publishing to GitHub
export async function POST(request: NextRequest) {
  console.log('GitHub publishing started');
  try {
    // Parse the request
    const body = await request.json();
    const { postId } = body;
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Get the post WITHOUT trying to include translations
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Generate translations based on translationSlugs
    let translations = [];
    try {
      // Use the translationSlugs field from the post to find translations
      if (post.translationSlugs && typeof post.translationSlugs === 'object') {
        const translationEntries = Object.entries(post.translationSlugs);
        
        if (translationEntries.length > 0) {
          // For each language in translationSlugs
          for (const [lang, slug] of translationEntries) {
            // Skip the current language
            if (lang === post.language) continue;
            
            // Try to find the translation in the database
            const translation = await prisma.post.findFirst({
              where: {
                language: lang,
                slug: slug as string
              }
            });
            
            if (translation) {
              translations.push(translation);
            }
          }
        }
      }
    } catch (translationError) {
      console.warn('Warning: Could not fetch translations:', 
        translationError instanceof Error ? translationError.message : 'Unknown error');
      // Continue without translations
    }
    
    // Check if GitHub credentials are configured
    if (!config.owner || !config.repo || !process.env.GITHUB_ACCESS_TOKEN) {
      return NextResponse.json({ 
        error: 'GitHub configuration is incomplete. Please check environment variables.' 
      }, { status: 500 });
    }
    
    // Create a feature branch for this post
    const branchName = `post-${postId}-${Date.now()}`;
    
    try {
      // Get the latest commit on the base branch
      const { data: refData } = await octokit.git.getRef({
        owner: config.owner,
        repo: config.repo,
        ref: `heads/${config.baseBranch}`,
      });
      
      // Create a new branch from this ref
      await octokit.git.createRef({
        owner: config.owner,
        repo: config.repo,
        ref: `refs/heads/${branchName}`,
        sha: refData.object.sha,
      });
    } catch (gitError) {
      console.error('Git error:', gitError instanceof Error ? gitError.message : 'Unknown error');
      return NextResponse.json(
        { error: 'Failed to create Git branch' }, 
        { status: 500 }
      );
    }
    
    // Prepare files for committing
    const files = [];
    
    // Main post file - updated to match the file structure: blog/nameofblog/en.md
    const mainPostPath = `${config.contentPath}/${post.slug}/${post.language}.md`;
    
    try {
      const mainPostContent = matter.stringify(post.content || '', {
        title: post.title,
        date: post.date || new Date().toISOString().split('T')[0],
        author: post.author,
        description: post.description || '',
        image: post.image || '',
        category: post.category || '',
        readTime: post.readTime || 5,
        tags: post.tags || [],
        featured: post.featured || false,
        toc: true,
        translationSlugs: post.translationSlugs || {},
      });
      
      // Commit the main post file
      const mainPostResponse = await octokit.repos.createOrUpdateFileContents({
        owner: config.owner,
        repo: config.repo,
        path: mainPostPath,
        message: `Add/update post: ${post.slug}`,
        content: Buffer.from(mainPostContent).toString('base64'),
        branch: branchName,
      });
      
      // Commit translation files if they exist
      if (translations && translations.length > 0) {
        for (const translation of translations) {
          const transPath = `${config.contentPath}/${translation.slug}/${translation.language}.md`;
          const transContent = matter.stringify(translation.content || '', {
            title: translation.title,
            date: translation.date || post.date || new Date().toISOString().split('T')[0],
            author: translation.author || post.author,
            description: translation.description || '',
            image: translation.image || post.image || '',
            category: translation.category || post.category || '',
            readTime: translation.readTime || post.readTime || 5,
            tags: translation.tags || post.tags || [],
            featured: translation.featured || post.featured || false,
            toc: true,
            translationSlugs: post.translationSlugs || {},
          });
          
          await octokit.repos.createOrUpdateFileContents({
            owner: config.owner,
            repo: config.repo,
            path: transPath,
            message: `Add/update translation: ${translation.slug}`,
            content: Buffer.from(transContent).toString('base64'),
            branch: branchName,
          });
        }
      }
      
      // Create a pull request
      const { data: pullRequest } = await octokit.pulls.create({
        owner: config.owner,
        repo: config.repo,
        title: `Blog post update: ${post.title}`,
        body: `This PR adds or updates blog post content for: ${post.title}`,
        head: branchName,
        base: config.baseBranch,
      });
      
      // Update the post in the database with PR info
      await prisma.post.update({
        where: { id: postId },
        data: {
          published: true,
          publishedAt: new Date(),
          githubPrUrl: pullRequest.html_url,
          githubPrNumber: pullRequest.number,
        },
      });
      
      // Log successful publishing
      console.log(`Successfully published post ${postId} to GitHub PR #${pullRequest.number}`);
      
      // Return success with PR data
      return NextResponse.json({
        success: true,
        message: 'Post published to GitHub successfully!',
        pullRequest: {
          url: pullRequest.html_url,
          number: pullRequest.number,
        },
      });
    } catch (contentError) {
      console.error('Error with content processing:', 
        contentError instanceof Error ? contentError.message : 'Unknown error');
      return NextResponse.json(
        { error: 'Failed to process or commit content' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    // Fixed error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error publishing to GitHub:', errorMessage);
    
    return NextResponse.json(
      { error: 'Failed to publish to GitHub: ' + errorMessage }, 
      { status: 500 }
    );
  }
}

// Get GitHub status for a post
export async function GET(request: NextRequest) {
  try {
    // Get postId from query params
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    
    // Get the post
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        githubPrUrl: true,
        githubPrNumber: true,
        published: true,
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
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error checking GitHub status:', errorMessage);
    
    return NextResponse.json(
      { error: 'Failed to check GitHub status: ' + errorMessage }, 
      { status: 500 }
    );
  }
}