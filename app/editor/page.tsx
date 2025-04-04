'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  List,
  Quote,
  Undo,
  Redo,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  Video as VideoIcon,
  Smile,
  PaintBucket,
  HighlighterIcon,
  Type,
} from 'lucide-react';
import AddChapterModal from '@/components/addchapter';
import { toast } from '@/hooks/use-toast';
import EmojiPicker from 'emoji-picker-react';

const api = process.env.NEXT_PUBLIC_API_URL;

interface Chapter {
  title: string;
  _id: string;
  slug: string;
}

const FONT_SIZES = [
  '8px', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '40px'
];

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#808080', '#800000', '#008000', '#000080', '#808000', '#800080', '#008080'
];

const HIGHLIGHT_COLORS = [
  '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#E91E63', '#9C27B0',
  '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688'
];

export default function WritePage() {
  // ... (keep existing state variables)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleAddChapter = (chapter: Chapter) => {
    setChapters((prevChapters) => [...prevChapters, chapter]);
  };
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
      return
    }
  }, [loading, isAuthenticated]);




  useEffect(() => {
    const fetchChapters = async () => {
      const response = await fetch(api+'/story/chapter');
      const data = await response.json();
      if(data.success){
        setChapters(data.data);
      }
    };
    fetchChapters();
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'cursor-pointer text-blue-500 hover:underline',
        },
      }),
      Underline,
      TextStyle,
      Color,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: '',
  });

  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  };

  const addImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        editor?.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const addVideo = () => {
    const url = prompt('Enter video URL (YouTube, Vimeo)');
    if (url) {
      const embedHtml = `<iframe 
        width="560" 
        height="315" 
        src="${url}" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>`;
      editor?.chain().focus().setContent(embedHtml).run();
    }
  };

  // ... (keep existing functions like handleImageUpload, saveStory, etc.)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const saveStory = async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', editor?.getHTML() || '');
      formData.append('category', category);
      formData.append('tags', tags.join(','));
      if (image) {
        formData.append('file', image);
      }
      formData.append('chapterId', selectedChapter);
      formData.append('excerpt', editor?.getHTML()?.slice(0, 100) || '');
      const response = await fetch(api+'/blog', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      const data = await response.json();
      if(data.success){
        toast({
          title: 'Story Added',
          description: 'Story has been added successfully',
        })
        setTitle('');
        setCategory('');
        setTags([]);
        setImage(null);
        setSelectedChapter('');
        editor?.commands.setContent('');
      }
      else{
        toast({
          title: 'Error',
          description: data.message,
        })
      }
  
    };

  return (
    <div className="min-h-screen bg-background">
      <AddChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddChapter={handleAddChapter}
      />
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* ... (keep existing form fields) */}
        <div className="space-y-4 bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Add New Story</h2>
          <Separator />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Story Title</label>
            <Input
              placeholder="Enter your story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>
            <Input
              placeholder="Enter your story category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tags</label>
            <Input
              placeholder="Enter your story tags"
              value={tags.join(',')}
              onChange={(e) => setTags(e.target.value.split(','))}
            />
          </div>


          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border file:bg-card file:text-muted-foreground"
            />
            {image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded"
                  className="max-w-xs rounded shadow"
                />
              </div>
            )}
          </div>
          {/* Add Chapter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium">Add Chapter</label>
              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Chapter
              </Button>
            </div>
            </div>
          </div>

          {/* Chapter Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Chapter</label>
            <Select onValueChange={(value: string) => setSelectedChapter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a chapter" />
              </SelectTrigger>
              <SelectContent>
                {chapters.map((chapter, index) => (
                  <SelectItem key={index} value={chapter._id}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>


        <div className="col-span-3 bg-card rounded-lg p-4 shadow-lg">
          {selectedChapter ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Editor</h2>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2 pb-4">
                {/* Existing buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  data-active={editor?.isActive('bold')}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                {/* ... (keep other existing buttons) */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                    data-active={editor?.isActive('italic')}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                    data-active={editor?.isActive('underline')}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    data-active={editor?.isActive('heading', { level: 1 })}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    data-active={editor?.isActive('heading', { level: 2 })}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                    data-active={editor?.isActive('heading', { level: 3 })}
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                    data-active={editor?.isActive({ textAlign: 'left' })}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                    data-active={editor?.isActive({ textAlign: 'center' })}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                    data-active={editor?.isActive({ textAlign: 'right' })}
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}
                    data-active={editor?.isActive('bulletList')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                    data-active={editor?.isActive('orderedList')}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                    data-active={editor?.isActive('blockquote')}
                  >
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Separator orientation="vertical" className="h-8" />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>

                {/* New formatting buttons */}
                <Separator orientation="vertical" className="h-8" />
                
                {/* Font Size */}



                {/* Text Color */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <PaintBucket className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div className="grid grid-cols-4 gap-2">
                      {COLORS.map((color) => (
                        <Button
                          key={color}
                          variant="ghost"
                          className="w-8 h-8 p-0"
                          style={{ backgroundColor: color }}
                          onClick={() => editor?.chain().focus().setColor(color).run()}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Highlight Color */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <HighlighterIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div className="grid grid-cols-4 gap-2">
                      {HIGHLIGHT_COLORS.map((color) => (
                        <Button
                          key={color}
                          variant="ghost"
                          className="w-8 h-8 p-0"
                          style={{ backgroundColor: color }}
                          onClick={() => editor?.chain().focus().toggleHighlight({ color }).run()}
                        />
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Link */}
                <Popover open={showLinkInput} onOpenChange={setShowLinkInput}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter URL"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                      />
                      <Button onClick={addLink}>Add</Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Image Upload */}
                <Button variant="ghost" size="icon" className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={addImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <ImageIcon className="h-4 w-4" />
                </Button>

                {/* Video */}
                <Button variant="ghost" size="icon" onClick={addVideo}>
                  <VideoIcon className="h-4 w-4" />
                </Button>

                {/* Emoji */}
                <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        editor?.chain().focus().insertContent(emojiData.emoji).run();
                        setShowEmojiPicker(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="prose prose-invert max-w-none">
                <EditorContent editor={editor} />
              </div>
            </div>
          ) : (
            <div className="h-[calc(100vh-200px)] flex items-center justify-center text-muted-foreground">
              Select a chapter to start writing
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveStory}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}