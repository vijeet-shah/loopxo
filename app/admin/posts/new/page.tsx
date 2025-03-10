// app/admin/posts/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { PostEditor } from '@/components/admin/blog/postEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NewPostPage() {
  const router = useRouter();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => router.push('/admin/posts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
      </div>
      
      <h1 className="text-2xl font-bold">Create New Post</h1>
      
      <PostEditor isNew={true} />
    </div>
  );
}