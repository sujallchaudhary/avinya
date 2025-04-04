import { StoryGrid } from '@/components/story-grid';
import { BookHeader } from '@/components/book-header';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <BookHeader />
        <StoryGrid />
      </main>
    </div>

  );
}