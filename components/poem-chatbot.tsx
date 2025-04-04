'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Loader2, User, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { analyzePoemWithGemini } from '@/lib/gemini';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PoemChatbotProps {
  poemTitle: string;
  poemContent: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PoemChatbot({ poemTitle, poemContent, isOpen, onClose }: PoemChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help analyze this poem for you. What would you like to know about it?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get response from Gemini API
      const response = await analyzePoemWithGemini(poemTitle, poemContent, inputValue);
      
      // Add assistant message
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I can help analyze this poem for you. What would you like to know about it?'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md md:max-w-2xl h-[80vh] flex flex-col bg-card border-primary/20 rounded-xl overflow-hidden fade-in">
        <div className="flex items-center justify-between bg-accent/30 px-4 py-3 border-b border-border/50">
          <div className="flex items-center">
            <Bot className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold">Poetry Analysis Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={resetChat}
              title="Reset conversation"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 transition-opacity",
                message.role === 'assistant' ? 'fade-in-delay-1' : 'fade-in'
              )}
            >
              <div className={cn(
                "flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0",
                message.role === 'assistant' 
                  ? "bg-primary/10 text-primary" 
                  : "bg-accent/50 text-foreground"
              )}>
                {message.role === 'assistant' ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div className={cn(
                "p-3 rounded-lg text-sm flex-1 break-words",
                message.role === 'assistant' 
                  ? "bg-accent/30 border border-border/30" 
                  : "bg-primary/10"
              )}>
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start gap-3 fade-in">
              <div className="flex items-center justify-center rounded-full w-8 h-8 bg-primary/10 text-primary flex-shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="p-3 rounded-lg text-sm bg-accent/30 border border-border/30 flex-1 flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Analyzing poem...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {!isLoading && (
          <div className="p-3 border-t bg-card">
            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs py-1 h-auto"
                  onClick={() => handleSuggestedQuestion("Can you explain the main theme of this poem?")}
                >
                  Explain main theme
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs py-1 h-auto"
                  onClick={() => handleSuggestedQuestion("What literary devices are used in this poem?")}
                >
                  Literary devices
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs py-1 h-auto"
                  onClick={() => handleSuggestedQuestion("What is the cultural context of this poem?")}
                >
                  Cultural context
                </Button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about this poem..."
                className="flex-1 px-3 py-2 rounded-md bg-background border border-input focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
