// app/admin/posts/[id]/edit/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PostEditor } from '@/components/admin/blog/postEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postSlug, setPostSlug] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/admin/posts/${postId}?fields=slug`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPostSlug(data.slug || '');
        setLoading(false);
      } catch (err) {
        setError('Error loading post: ' + (err instanceof Error ? err.message : 'Unknown error'));
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  // Delete post handler
  const handleDelete = async () => {
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
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/posts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
        
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
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
              <a href={`/blog/${postSlug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Site
              </a>
            </Button>
          )}
        </div>
        
        <Button 
          variant="destructive" 
          onClick={handleDelete}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Post
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold">Edit Post</h1>
      
      <PostEditor postId={postId} />
    </div>
  );
}