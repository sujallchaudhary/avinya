"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, ThumbsUp, Clock, Book, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface Story {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  chapters: number;
  views: number;
  likes: number;
}

interface UserStoriesProps {
  stories: Story[];
}

export default function UserStories({ stories }: UserStoriesProps) {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  if (stories.length === 0) {
    return (
      <div className="py-10 text-center">
        <Book className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-xl font-medium mb-2">No stories yet</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Your published stories will appear here.
        </p>
        <Link href="/write">
          <Button>
            Start Writing
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Stories ({stories.length})</h2>
        <div className="flex gap-2">
          <Button 
            variant={viewType === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('grid')}
          >
            Grid
          </Button>
          <Button 
            variant={viewType === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewType('list')}
          >
            List
          </Button>
        </div>
      </div>

      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {stories.map((story) => (
            <StoryListItem key={story._id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}

function StoryCard({ story }: { story: Story }) {
  const timeAgo = formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={story.coverImage || '/placeholder-cover.jpg'}
          alt={story.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-6 flex-1">
        <div className="flex justify-between items-start">
          <Link href={`/story/${story._id}`} className="hover:underline">
            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{story.title}</h3>
          </Link>
          <StoryActions storyId={story._id} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {story.description}
        </p>
        <Badge variant="outline" className="mb-2">
          <Book className="h-3 w-3 mr-1" />
          {story.chapters} {story.chapters === 1 ? 'chapter' : 'chapters'}
        </Badge>
      </CardContent>
      <CardFooter className="border-t pt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Updated {timeAgo}
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {story.views}
          </span>
          <span className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            {story.likes}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

function StoryListItem({ story }: { story: Story }) {
  const timeAgo = formatDistanceToNow(new Date(story.updatedAt), { addSuffix: true });
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4 flex gap-4">
        <div className="relative h-24 w-24 flex-shrink-0">
          <Image
            src={story.coverImage || '/placeholder-cover.jpg'}
            alt={story.title}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <Link href={`/story/${story._id}`} className="hover:underline">
              <h3 className="text-lg font-semibold mb-1 line-clamp-1">{story.title}</h3>
            </Link>
            <StoryActions storyId={story._id} />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {story.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <Badge variant="outline">
              <Book className="h-3 w-3 mr-1" />
              {story.chapters} {story.chapters === 1 ? 'chapter' : 'chapters'}
            </Badge>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Updated {timeAgo}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {story.views}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-1" />
              {story.likes}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StoryActions({ storyId }: { storyId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Story options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/editor/${storyId}`} className="flex items-center w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit Story
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600 dark:text-red-400">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Story
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
