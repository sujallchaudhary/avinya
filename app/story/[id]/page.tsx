import { cookies } from 'next/headers';
import { ChapterContent } from '@/components/chapter-content';
import { ChapterNavigation } from '@/components/chapter-navigation';
import { CommentSection } from '@/components/comment-section';
import { notFound } from 'next/navigation';
import ScrollProgress from '@/components/ui/scroll-progress';
import { VerificationButton } from '@/components/verifyPost';
import { PoemChatbotButton } from '@/components/poem-chatbot-button';

const api = process.env.NEXT_PUBLIC_API_URL;

async function fetchChapterData(slug: string, token: string) {
  const res = await fetch(`${api}/story/slug/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (!data.success) {
    return null;
  }

  return data;
}

const fetchMetaData = async (slug: string) => {
  const res = await fetch(`${api}/story/metadata/${slug}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  if (!data.success) {
    return null;
  }

  return data;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const chapterResponse = await fetchMetaData(params.id);
  if (!chapterResponse) {
    return {
      title: 'Chapter Not Found - GaleTales',
      description: 'This chapter is not available.',
      openGraph: {
        title: 'Chapter Not Found - GaleTales',
        description: 'This chapter is not available.',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title: 'Chapter Not Found - GaleTales',
        description: 'This chapter is not available.',
      },
    };
  }
  const { data } = chapterResponse;
  return {
    title: `${data.title} - GaleTales`,
    description: data.excerpt,
    tags: data.tags,
    openGraph: {
      title: data.title,
      description: data.excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/story/${data.slug}`,
      images: [
        {
          url: data.thumbnail,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.excerpt,
      image: data.thumbnail,
    },
  };
}

export default async function ChapterPage({ params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value || '';

  const chapterResponse = await fetchChapterData(params.id, token);

  if (!chapterResponse) {
    notFound();
  }

  const { data, nextSlug, previousSlug } = chapterResponse;

  return (
    <div className="min-h-screen bg-background relative">
      <ScrollProgress className="top-[56px]" />
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          {
            data.isVerified ? null : (
              <VerificationButton postId={data._id} token={token} />
            )
          }
         
          <ChapterContent
            title={data.title}
            author={data.author.name}
            publishedAt={data.createdAt}
            views={data.views}
            content={data.content}
            thumbnail={data.thumbnail}
          />
          <ChapterNavigation prevSlug={previousSlug} nextSlug={nextSlug} />
          <CommentSection chapterId={data._id} />
        </article>
        
        {/* Poem Analysis Chatbot */}
        <PoemChatbotButton 
          poemTitle={data.title}
          poemContent={data.content}
        />
      </main>
    </div>
  );
}
