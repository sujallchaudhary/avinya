import { FC, useState } from "react";
import { toast } from '@/hooks/use-toast';

interface AddChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChapter: (chapterName:any ) => void;
}

const api = process.env.NEXT_PUBLIC_API_URL;

const AddChapterModal: FC<AddChapterModalProps> = ({ isOpen, onClose, onAddChapter }) => {
  const [chapterName, setChapterName] = useState<string>("");

  const saveChapter = async(chapterTitle:string,token:string) => {
    const response = await fetch(`${api}/story/chapter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({title: chapterTitle})
    })
    const data = await response.json();
    if(data.success){
      toast({
        title: 'Chapter Added',
        description: 'Chapter has been added successfully',
      });
      onAddChapter(data.data);
    }
    else{
      toast({
        title: 'Error',
        description: data.message,
      });
    }
  }

  const handleAddChapter = () => {
    if (chapterName.trim() === "") {
      toast({
        title: 'Error',
        description: 'Chapter name cannot be empty',
      });
      return;
    }
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1') || '';
    saveChapter(chapterName,token);
    setChapterName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Chapter</h2>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter chapter name"
          value={chapterName}
          onChange={(e) => setChapterName(e.target.value)}
        />
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleAddChapter}
          >
            Add Chapter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChapterModal;
