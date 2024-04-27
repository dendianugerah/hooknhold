import { X } from "lucide-react";
import { useState, useCallback } from "react";
import { FolderIcon } from "@/components/icon";
import useCreateFolder from "@/hooks/createFolder";

interface FolderProps {
  userId: string;
  showCreateFolder: boolean;
  setShowCreateFolder: (value: boolean) => void;
}

function CreateFolder({
  userId,
  showCreateFolder,
  setShowCreateFolder,
}: FolderProps) {
  const [folderName, setFolderName] = useState("");
  const createFolder = useCreateFolder(userId, () =>
    setShowCreateFolder(false)
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    if (folderName) {
      createFolder.mutate(folderName);
      setFolderName("");
    }
  }, [folderName, createFolder]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && folderName) {
        createFolder.mutate(folderName);
        setFolderName("");
      }
    },
    [folderName, createFolder]
  );

  return (
    <div className="group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-black transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
      <div className="flex items-center gap-3">
        <FolderIcon className="h-4 w-4" />
        <input
          type="text"
          value={folderName}
          onChange={handleInputChange}
          placeholder="New folder"
          className="bg-transparent outline-none text-black"
          autoFocus
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <button onClick={() => setShowCreateFolder(false)}>
        <X className="h-4 w-4 text-black font-bold" />
      </button>
    </div>
  );
}

export default CreateFolder;
