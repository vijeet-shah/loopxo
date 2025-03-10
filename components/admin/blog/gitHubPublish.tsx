'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Github, Check, AlertCircle, Loader2 } from 'lucide-react';

interface GitHubPublishProps {
  postId: string;
}

export function GitHubPublish({ postId }: GitHubPublishProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prUrl, setPrUrl] = useState<string | null>(null);
  const [prNumber, setPrNumber] = useState<number | null>(null);
  const [published, setPublished] = useState(false);
  
  // Simple check for existing publication
  useEffect(() => {
    if (!postId) return;
    
    const checkPublication = async () => {
      try {
        // Simple GET request
        const response = await fetch(`/api/admin/github/${postId}`);
        
        // If not found, just return
        if (response.status === 404) return;
        
        // Only proceed with successful responses
        if (!response.ok) return;
        
        // Try to parse as JSON
        const data = await response.json();
        
        // Update state with available data
        if (data && data.githubPrUrl) {
          setPrUrl(data.githubPrUrl);
          setPrNumber(data.githubPrNumber || null);
          setPublished(true);
        }
      } catch (error) {
        // Silently handle errors during initial check
        console.log("Initial publication check failed:", error);
      }
    };
    
    checkPublication();
  }, [postId]);
  
  // Handle publishing to GitHub (simplified)
  const handlePublish = async () => {
    if (!postId) {
      setError("No post ID provided");
      return;
    }
    
    setLoading(true);
    setError(null);
    setStatus('Publishing to GitHub...');
    
    try {
      // Simplified POST request with minimal error surface
      const response = await fetch('/api/admin/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });
      
      // Handle error response
      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || `Server error: ${response.status}`);
        setStatus(null);
        return;
      }
      
      // Handle success
      setPublished(true);
      setStatus('Published successfully!');
      
      // Try to get PR details from response
      try {
        const data = await response.json();
        if (data && data.pullRequest) {
          setPrUrl(data.pullRequest.url);
          setPrNumber(data.pullRequest.number);
        }
      } catch (parseError) {
        // If parsing fails, we still consider it a success
        console.log("Could not parse response details:", parseError);
      }
      
      // Clear status after delay
      setTimeout(() => setStatus(null), 5000);
      
    } catch (error) {
      // Handle network errors
      setError(`Network error: ${error instanceof Error ? error.message : "Could not connect to server"}`);
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Github className="mr-2 h-5 w-5" />
          GitHub Publishing
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {status && (
          <Alert className="mb-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
            <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-500" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              {status}
            </AlertDescription>
          </Alert>
        )}
        
        {published && prUrl && (
          <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
            <Check className="h-4 w-4 mr-2 text-green-500" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              Published to GitHub: PR #{prNumber}{' '}
              <a 
                href={prUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-green-600 dark:hover:text-green-200"
              >
                View on GitHub
              </a>
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handlePublish}
          disabled={loading}
          className="w-full bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Github className="mr-2 h-4 w-4" />
              {published ? 'Republish to GitHub' : 'Publish to GitHub'}
            </>
          )}
        </Button>
        
        {!published && (
          <p className="text-sm text-muted-foreground mt-4">
            Publishing to GitHub will create a pull request with your post content.
            Once merged, the post will be deployed to your site.
          </p>
        )}
      </CardContent>
    </Card>
  );
}