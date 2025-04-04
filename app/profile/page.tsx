"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, User, Book, CalendarDays } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserStories from '@/components/user-stories';
import UserInfo from '@/components/user-info';

interface UserData {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  joinedAt: string;
  profilePicture?: string;
}

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

export default function ProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get token from cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];

        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch user data
        const userResponse = await fetch(`${api}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user stories
        const storiesResponse = await fetch(`${api}/stories/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!storiesResponse.ok) {
          throw new Error('Failed to fetch user stories');
        }

        const storiesData = await storiesResponse.json();
        setStories(storiesData);
      } catch (err) {
        setError('An error occurred while fetching your profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [api, router]);

  if (loading) {
    return (
      <div className="container max-w-4xl py-12 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-4xl py-12">
        <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => router.push('/login')}
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Format the joined date
  const joinedDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="container max-w-4xl py-8">
      <UserInfo user={user} joinedDate={joinedDate} />
      
      <Separator className="my-8" />
      
      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="stories">My Stories</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="comments">Recent Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stories">
          <UserStories stories={stories} />
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card className="p-6">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your favorite stories will appear here
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments">
          <Card className="p-6">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your recent comments will appear here
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
