import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function ChapterNavigation({ prevSlug, nextSlug }: NavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 mb-12">
      {prevSlug ? (
        <Link href={`/story/${prevSlug}`}>
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Story
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextSlug && (
        <Link href={`/story/${nextSlug}`}>
          <Button variant="ghost">
            Next Story
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </div>
  );
}
