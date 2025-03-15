// components/admin/blog/MarkdownEditor.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, Link, List, ListOrdered, Code, Heading1, Heading2, Heading3 } from 'lucide-react';
import markdownToHtml from '@/lib/markdownToHtml';
import Image from 'next/image';



interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  preview?: boolean;
}

export function MarkdownEditor({ value, onChange, preview = false }: MarkdownEditorProps) {
  const [previewHtml, setPreviewHtml] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>(preview ? 'preview' : 'write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update preview content when value changes
  useEffect(() => {
    const updatePreview = async () => {
      if (activeTab === 'preview' || preview) {
        try {
          const { content } = await markdownToHtml(value || '');
          setPreviewHtml(content);
        } catch (error) {
          console.error('Error rendering markdown:', error);
          setPreviewHtml('<p>Error rendering preview</p>');
        }
      }
    };

    updatePreview();
  }, [value, activeTab, preview]);

  // Switch tabs based on preview prop
  useEffect(() => {
    setActiveTab(preview ? 'preview' : 'write');
  }, [preview]);

  // Insert markdown syntax at cursor position
  const insertMarkdown = (before: string, after: string = '') => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText = value.substring(selectionStart, selectionEnd);
    
    const newText = value.substring(0, selectionStart) +
      before + selectedText + after +
      value.substring(selectionEnd);

    onChange(newText);
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart + before.length,
        selectionEnd + before.length
      );
    }, 0);
  };

  // Toolbar button handlers
  const handleBold = () => insertMarkdown('**', '**');
  const handleItalic = () => insertMarkdown('*', '*');
  const handleLink = () => {
    const url = prompt('Enter URL:', 'https://');
    if (url) {
      insertMarkdown('[', `](${url})`);
    }
  };
  const handleUnorderedList = () => insertMarkdown('- ');
  const handleOrderedList = () => insertMarkdown('1. ');
  const handleImage = () => {
    const url = prompt('Enter image URL:', 'https://');
    const alt = prompt('Enter image description:', '');
    if (url) {
      insertMarkdown(`![${alt || 'image'}](${url})`);
    }
  };
  const handleCode = () => insertMarkdown('```\n', '\n```');
  const handleH1 = () => insertMarkdown('# ');
  const handleH2 = () => insertMarkdown('## ');
  const handleH3 = () => insertMarkdown('### ');

  // Handle tab view
  const togglePreview = () => {
    setActiveTab(activeTab === 'write' ? 'preview' : 'write');
  };

  return (
    <div className="border rounded-md shadow-sm overflow-hidden">
      {!preview && (
        <div className="flex items-center justify-between border-b p-2">
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={handleH1}>
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleH2}>
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleH3}>
              <Heading3 className="h-4 w-4" />
            </Button>
            <div className="h-5 border-r mx-1"></div>
            <Button variant="ghost" size="sm" onClick={handleBold}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleItalic}>
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLink}>
              <Link className="h-4 w-4" />
            </Button>
            <div className="h-5 border-r mx-1"></div>
            <Button variant="ghost" size="sm" onClick={handleUnorderedList}>
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleOrderedList}>
              <ListOrdered className="h-4 w-4" />
            </Button>
            <div className="h-5 border-r mx-1"></div>
            <Button variant="ghost" size="sm" onClick={handleImage}>
              <Image src={""} className="h-4 w-4" alt="image" width={100} height={100}/>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCode}>
              <Code className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={togglePreview}>
            {activeTab === 'write' ? 'Preview' : 'Write'}
          </Button>
        </div>
      )}

      <Tabs value={activeTab} className="w-full">
        {!preview && (
          <TabsContent value="write" className="mt-0">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Write your markdown content here..."
              className="min-h-[500px] font-mono text-sm border-0 resize-y focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </TabsContent>
        )}

        <TabsContent value="preview" className={preview ? "mt-0 p-0" : "mt-0"}>
          <div 
            className="markdown-content p-4 min-h-[500px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: previewHtml }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}