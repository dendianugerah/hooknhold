import React, { useState } from "react";
import {
  Input,
  Button,
  MultipleSelector,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  Card,
  CardContent,
} from "@/components/ui";
import { Option } from "@/components/ui/multiple-selector";
import { useCreateBookmark, useTags, useFolders } from "@/hooks";
import { LoaderCircle } from "lucide-react";

interface BookmarkDialogProps {
  userId: string;
  onClose: () => void;
}

const BookmarkDialog: React.FC<BookmarkDialogProps> = ({ userId, onClose }) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [selectedFolderName, setSelectedFolderName] = useState("Select");

  const { options } = useTags(userId);
  const { folders } = useFolders(userId);
  const createBookmark = useCreateBookmark(userId, onClose);

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    const bookmarkData: any = { url };
    if (selectedTags.length > 0) {
      bookmarkData.tags = selectedTags.map((tag) => tag.value);
    }
    if (selectedFolderId) {
      bookmarkData.folderId = selectedFolderId;
    }

    createBookmark.mutate(bookmarkData, {
      onSuccess: () => {
        setUrl("");
        setSelectedTags([]);
        setSelectedFolderId("");
        setSelectedFolderName("Select");
        setError("");
        onClose();
      },
    });
  };

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0 space-y-3 mt-4">
        <div className="flex flex-col space-y-2">
          <h1 className="font-semibold text-sm">
            URL <span className="text-xs">(required)</span>
          </h1>
          <Input
            id="url"
            className="rounded-md"
            placeholder="https://"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex space-x-4 mb-2">
          <div className="flex flex-col space-y-2 w-3/5">
            <h1 className="font-semibold text-sm">Tags</h1>
            <div className="w-full">
              <MultipleSelector
                defaultOptions={options}
                placeholder="type to search or add tags..."
                creatable
                emptyIndicator={
                  <p className="text-center text-sm leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
                onChange={(value: any) => setSelectedTags(value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-2/5 h-8">
            <h1 className="font-semibold text-sm">Folder</h1>
            <Select
              onValueChange={(value) => {
                const selectedFolder = folders.find(
                  (folder) => folder.id === value
                );
                setSelectedFolderId(value);
                setSelectedFolderName(
                  selectedFolder ? selectedFolder.name : "Select"
                );
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select">
                  {selectedFolderName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                {folders.map((folder) => (
                  <SelectItem
                    key={folder.id}
                    value={folder.id}
                    className="cursor-pointer"
                  >
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && (
          <div className="text-sm text-red-500 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}
        <Button
          onClick={handleSubmit}
          disabled={createBookmark.isLoading}
          variant="custom_primary"
          className="w-full"
        >
          {createBookmark.isLoading ? (
            <>
              Saving
              <LoaderCircle className="w-4 h-4 ml-2 animate-spin" />
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookmarkDialog;
