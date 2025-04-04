import Link from 'next/link';
import { Eye, ThumbsUp, Book, ChevronDown, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cookies } from 'next/headers';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Story {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  views?: number;
  likes?: number;
}

interface Chapter {
  _id: string;
  title: string;
  slug: string;
  stories: Story[];
}

function StoryCard({ story }: { story: Story }) {
  return (
    <Link href={`/story/${story.slug}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:scale-[1.02] border-border/40 hover:border-primary/40 fade-in">
        <div className="relative w-full h-[180px]">
          <img
            src={story.thumbnail || '/placeholder-cover.jpg'}
            alt={story.title}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
        </div>
        <CardContent className="p-4 relative">
          <h3 className="font-semibold truncate mb-2 text-foreground">{story.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {story.description || "No description available"}
          </p>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t border-border/50 flex justify-between bg-accent/30">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Book className="h-3 w-3 text-primary" />
            <span>Story</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {story.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-primary/80" />
                {story.views}
              </span>
            )}
            {story.likes !== undefined && (
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3 text-primary/80" />
                {story.likes}
              </span>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function ChapterSection({ chapter }: { chapter: Chapter }) {
  return (
    <div className="mb-10 fade-in-delay-1">
      <Accordion type="single" collapsible defaultValue={chapter._id}>
        <AccordionItem value={chapter._id} className="border-none">
          <AccordionTrigger className="py-3 px-4 bg-accent/30 rounded-lg hover:bg-accent/60 hover:text-accent-foreground no-underline group transition-colors">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="h-6 w-1 bg-primary rounded-full mr-3 group-hover:scale-y-125 transition-transform"></span>
              {chapter.title}
            </h2>
          </AccordionTrigger>
          <AccordionContent className="pt-8 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {chapter.stories.map((story, index) => (
                <div key={story._id} className={`fade-in-delay-${(index % 3) + 1}`}>
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
    console.log(data);

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
      
      // Include more story details
      chapterMap[chapterId].stories.push({
        _id: story._id,
        title: story.title,
        slug: story.slug,
        description: story.description || '',
        thumbnail: story.thumbnail || '',
        views: story.views || 0,
        likes: story.likes || 0
      });
    });

    return Object.values(chapterMap);
  } catch (error) {
    throw new Error('Failed to fetch chapters');
  }
}

export async function StoryGrid() {
  let chapters: Chapter[];
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || '';
    chapters = await getChapters(token);
  } catch (error) {
    return (
      <div className="p-8 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/30">
            Failed to load stories. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {chapters.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-accent/30 rounded-full mb-6">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">No stories available yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Be the first to share your poetic journey with the world
            </p>
            <Link href="/write">
              <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                Start Writing
              </button>
            </Link>
          </div>
        ) : (
          chapters.map((chapter) => (
            <ChapterSection key={chapter._id} chapter={chapter} />
          ))
        )}
      </div>
    </div>
  );
}
