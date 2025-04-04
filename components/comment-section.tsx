'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
const api=process.env.NEXT_PUBLIC_API_URL
interface Comment {
  _id: string;
  name: string;
  comment: string;
  isApproved?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function CommentSection({ chapterId }: { chapterId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = token
          ? `${api}/comment/all/${chapterId}`
          : `${api}/comment/${chapterId}`;

        const response = await fetch(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data: ApiResponse<Comment[]> = await response.json();

        if (data.success) {
          setComments(data.data);
        } else {
          toast({
            title: 'Error',
            description: data.message,
            variant: 'destructive',
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch comments.',
          variant: 'destructive',
        });
      }
    };

    fetchComments();
  }, [chapterId, token]);

  const handleApproveComment = async (commentId: string) => {
    if (!token) return;

    try {
      const response = await fetch(`${api}/comment/approve/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data: ApiResponse<null> = await response.json();

      if (data.success) {
        toast({
          title: 'Comment Approved',
          description: 'The comment has been approved successfully.',
        });
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, isApproved: true } : comment
          )
        );
      } else {
        toast({
          title: 'Error',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve the comment.',
        variant: 'destructive',
      });
    }
  };
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newComment.trim()) {
      toast({
        title: 'Error',
        description: 'Comment cannot be empty.',
        variant: 'destructive',
      });
      return;
    }
  
    try {
      const response = await fetch(api+'/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          comment: newComment.trim(),
          storyId:chapterId,
        }),
      });
  
      const data: ApiResponse<null> = await response.json();
  
      if (data.success) {
        toast({
          title: 'Comment submitted',
          description: 'Your comment has been submitted for review.',
        });
        setNewComment('');
        // Optionally, fetch the updated comments here to show the newly added comment
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to submit the comment.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    }
  };
  

  return (
    <div className="bg-card p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comments
      </h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="mb-4"
        />
        <Button type="submit">Submit Comment</Button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="border-l-2 border-primary pl-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{comment.name}</span>
              <span className="text-sm text-muted-foreground">
                {comment.isApproved === false ? 'Pending Approval' : 'Approved'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{comment.comment}</p>
            {token && comment.isApproved === false && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleApproveComment(comment._id)}
              >
                Approve
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
