import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';

interface Story {
  _id: string;
  title: string;
  slug: string;
}

interface Chapter {
  _id: string;
  title: string;
  slug: string;
  stories: Story[];
}

function ChapterItem({ chapter }: { chapter: Chapter }) {
  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center py-2 px-4 rounded-lg hover:bg-accent/50 transition-colors",
          "cursor-pointer text-sm"
        )}
      >
        <ChevronDown className="h-4 w-4 mr-2 text-muted-foreground" />
        <span className="flex-1 font-semibold">{chapter.title}</span>
      </div>
      <div className="mt-1">
        {chapter.stories.map((story) => (
          <Link
            key={story._id}
            href={`/story/${story.slug}`}
            className="block ml-8 py-1 px-2 rounded-lg hover:bg-accent/50 text-muted-foreground hover:text-primary"
          >
            {story.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

async function getChapters(token: string) {
  const api = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${api}/story/home`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('Failed to fetch chapters');
    }

    const chapterMap: { [key: string]: Chapter } = {};

    data.data.forEach((story: any) => {
      const chapterId = story.chapter._id;
      if (!chapterMap[chapterId]) {
        chapterMap[chapterId] = {
          _id: story.chapter._id,
          title: story.chapter.title,
          slug: story.chapter.slug,
          stories: [],
        };
      }
      chapterMap[chapterId].stories.push({
        _id: story._id,
        title: story.title,
        slug: story.slug,
      });
    });

    return Object.values(chapterMap);
  } catch (error) {
    throw new Error('Failed to fetch chapters');
  }
}

export async function ChapterList() {
  let chapters: Chapter[];
  try {
      const cookieStore = cookies();
      const token = cookieStore.get('token')?.value || '';
    chapters = await getChapters(token);
  } catch (error) {
    return (
      <div className="p-8 bg-background min-h-screen text-red-500">
        Failed to load chapters. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto bg-card p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
        {chapters.map((chapter) => (
          <ChapterItem key={chapter._id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}