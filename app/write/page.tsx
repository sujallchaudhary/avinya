'use client';

import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading';
import Popup from '@/components/ui/popup';
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
} from 'lucide-react';
import AddChapterModal from '@/components/addchapter';
import { toast } from '@/hooks/use-toast';

const api=process.env.NEXT_PUBLIC_API_URL

interface Chapter {
  title: string;
  _id: string;
  slug: string;
};

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
      Highlight,
      Link,
      Underline,
    ],
    content: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const saveStory = async () => {
    const formData = new FormData();
    if(!title || !category || !tags || !selectedChapter || !editor?.getHTML()){
      toast({
        title: 'Error',
        description: 'Please fill all the fields',
      })
      return;
    }
    formData.append('title', title);
    formData.append('content', editor?.getHTML() || '');
    formData.append('category', category);
    formData.append('tags', tags.join(','));
    if (image) {
      formData.append('file', image);
    }
    formData.append('chapterId', selectedChapter);
    formData.append('excerpt', editor?.getText()?.slice(0, 100) || '');
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1') || '';
    setLoadingPage(true);
    const response = await fetch(api+'/story', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });
    const data = await response.json();
    if(data.success){
      toast({
        title: 'Poem Added',
        description: 'poem has been added successfully',
      })
      setTitle('');
      setCategory('');
      setTags([]);
      setImage(null);
      setSelectedChapter('');
      editor?.commands.setContent('');
      setLoadingPage(false);
      setIsPopupOpen(true);
    }
    else{
      toast({
        title: 'Error',
        description: data.message,
      })
      setLoadingPage(false);
    }

  };

  return (
    <div className="min-h-screen bg-background">
      <AddChapterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddChapter={handleAddChapter}
      />
      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title="Poem Added Successfully."
        description="Note: Your poem will be reviewed by our team before it is published. please wait for the review. Thank you."
        okButtonText="Got it"
        position="center"
      />
      {loadingPage && <LoadingScreen message="Saving poem..." description="Please wait while we save your story" isLoading={loadingPage} />}
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="space-y-4 bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold">Add New Poem</h2>
          <Separator />

          <div className="space-y-2">
            <label className="block text-sm font-medium">Poem Title</label>
            <Input
              placeholder="Enter your story title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>
            <Input
              placeholder="Enter your story category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required={true}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Tags</label>
            <Input
              placeholder="Enter your story tags separated by commas"
              value={tags.join(',')}
              onChange={(e) => setTags(e.target.value.split(','))}
              required={true}
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
                Add Category
              </Button>
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Select Category</label>
            <Select onValueChange={(value: string) => setSelectedChapter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
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

          {/* Content Editor */}
          <div className="col-span-3 bg-card rounded-lg p-4 shadow-lg">
            {selectedChapter ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Editor</h2>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-2 pb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                    data-active={editor?.isActive('bold')}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
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
            <Button onClick={saveStory} disabled={loadingPage}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
