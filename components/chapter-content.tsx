'use client';

import { Share2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { formatDistance } from 'date-fns';
import Image from 'next/image';

interface ChapterContentProps {
  title: string;
  author: string;
  publishedAt: string;
  views: number;
  content: string;
  thumbnail: string;
}

export function ChapterContent({
  title,
  author,
  publishedAt,
  views,
  content,
  thumbnail,
}: ChapterContentProps) {
  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        url: window.location.href,
      });
    } catch (error) {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link copied to clipboard',
        description: 'You can now share this chapter with others',
      });
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
        <div className="flex items-center space-x-4">
          <span>By {author}</span>
          <span>•</span>
          <span>{formatDistance(new Date(publishedAt), new Date(), { addSuffix: true })}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{views.toLocaleString()}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      <div>
        {
          thumbnail && (
            <Image src={thumbnail} alt={title} className="rounded-lg mb-4" height={800} width={800} />
          )
        }
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 text-gray-800 dark:text-gray-200" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
