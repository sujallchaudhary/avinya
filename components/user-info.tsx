"use client";

import { User, CalendarDays, Mail, Edit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface UserData {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  joinedAt: string;
  profilePicture?: string;
}

interface UserInfoProps {
  user: UserData;
  joinedDate: string;
}

export default function UserInfo({ user, joinedDate }: UserInfoProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <Avatar className="h-24 w-24 border-2 border-gray-200 dark:border-gray-700">
          {user.profilePicture ? (
            <AvatarImage src={user.profilePicture} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xl">
              <User className="h-12 w-12" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Button variant="outline" size="sm" className="md:self-start">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              {user.email}
            </div>
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              Joined {joinedDate}
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {user.bio || "No bio yet. Tell the community about yourself by editing your profile."}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Writer</Badge>
            <Badge variant="outline">Fiction</Badge>
            <Badge variant="outline">Fantasy</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
