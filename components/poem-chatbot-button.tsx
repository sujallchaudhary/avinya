'use client';

import { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PoemChatbot } from '@/components/poem-chatbot';

interface PoemChatbotButtonProps {
  poemTitle: string;
  poemContent: string;
}

export function PoemChatbotButton({ poemTitle, poemContent }: PoemChatbotButtonProps) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  return (
    <>
      {/* Poem Analysis Chatbot Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={() => setIsChatbotOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 transition-all"
        >
          <Bot className="h-6 w-6 text-black dark:text-white" />
          <span className="sr-only">Open Poetry Analysis Assistant</span>
        </Button>
      </div>
      
      {/* Poem Analysis Chatbot */}
      <PoemChatbot
        poemTitle={poemTitle}
        poemContent={poemContent}
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
      />
    </>
  );
}
