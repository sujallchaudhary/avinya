import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export function BookHeader() {
  return (
    <div className="mb-12 text-center fade-in">
      <div className="flex items-center justify-center mb-6">
        <Image 
          src="https://sdrive.blr1.cdn.digitaloceanspaces.com/files/147f5a9b9f68d2f31a43080ba18d61c0.png" 
          alt="logo" 
          height={400} 
          width={400} 
          className="h-20 w-20 text-primary" 
        />
      </div>
      <h1 className="text-5xl font-bold tracking-tight mb-3 indian-border pb-4 pt-2">
        <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
        Kavyapath
        </span>
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto hindi-text text-lg fade-in-delay-1">
        A digital platform to write, read, and share the beauty of Hindi poetry. Express yourself in the language of emotions.
      </p>
    </div>
  );
}