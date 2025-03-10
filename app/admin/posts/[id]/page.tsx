'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { PostEditor } from '@/components/admin/blog/postEditor';
import { TranslationManager } from '@/components/admin/blog/translationManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { SupportedLanguage } from '@/lib/i18n/types';
import { GitHubPublish } from '@/components/admin/blog/gitHubPublish';

export default function EditPostPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = params.id as string;
  const language = searchParams.get('lang') as SupportedLanguage || 'en';
  const [postSlug, setPostSlug] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch just the basic post details to get the slug
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/posts/${postId}?fields=slug,language`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        
        const data = await response.json();
        setPostSlug(data.slug || '');
      } catch (err) {
        setError('Error loading post: ' + (err instanceof Error ? err.message : 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  // Confirm delete handler
  const handleDeleteConfirm = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      
      router.push('/admin/posts');
    } catch (err) {
      setError('Error deleting post: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading post...</div>;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
            <p className="text-gray-600">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => router.push('/admin/posts')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Posts
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin/posts')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Posts
          </Button>
          
          {postSlug && (
            <Button 
              variant="outline" 
              asChild
            >
              <Link href={`/blog/${postSlug}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Site
              </Link>
            </Button>
          )}
        </div>
        
        <Button 
          variant="destructive" 
          onClick={handleDeleteConfirm}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Post
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold">Edit Post</h1>
      
      <PostEditor postId={postId} defaultLanguage={language} />
      <GitHubPublish postId={postId} />

      <div className="pt-6 border-t border-gray-200">
        <TranslationManager postId={postId} postSlug={postSlug} defaultLanguage={language} />
      </div>
    </div>
  );
}