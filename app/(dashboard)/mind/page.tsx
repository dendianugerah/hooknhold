"use client";
import { SearchContext } from "../layout";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Option } from "@/components/ui/multiple-selector";
import { PlusIcon, ShareIcon, LoadingCircleIcon } from "@/components/icon";
import {
  BookmarkCardView,
  BookmarkListView,
} from "@/components/container/mind/view";
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  Card,
  CardContent,
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
  MultipleSelector,
} from "@/components/ui";
import useUserId from "@/hooks/useUserId";
import ControlSection from "@/components/container/mind/control";
import BookmarkSkeleton from "@/components/skeleton/bookmark-skeleton";
import {
  useCreateBookmark,
  useDeleteBookmark,
  useBookmarks,
  useTags,
  useFolders,
} from "@/hooks";

interface MindProps {
  folderId?: string;
}

export default function Mind({ folderId }: MindProps) {
  const userId = useUserId();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [selectedFolderName, setSelectedFolderName] = useState("Select");

  const { options } = useTags(userId);
  const { folders } = useFolders(userId);
  const { search } = useContext(SearchContext);
  const { bookmarks, isLoading: isLoadBookmarks } = useBookmarks(
    userId,
    folderId,
    search
  );

  const createBookmark = useCreateBookmark(userId, () => setIsOpen(false));
  const deleteBookmark = useDeleteBookmark(userId);
  const createBookmarkData: any = { url: url };

  if (selectedTags.length > 0) {
    createBookmarkData.tags = selectedTags.map((tag) => tag.value);
  }

  if (selectedFolderId) {
    createBookmarkData.folderId = selectedFolderId;
  }

  const pathname = usePathname();
  const isMindRoute = pathname === "/mind";

  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 p-4 md:p-6 md:pt-2">
        <div className="flex md:flex-row items-center py-2 justify-between">
          <div>
            <ControlSection
              isCardView={isCardView}
              setIsCardView={setIsCardView}
            />
          </div>
          <div className="flex gap-x-2">
            {!isMindRoute && (
              <Button className="ml-auto shrink-0 rounded-md" variant="outline">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </Button>
            )}
            {/* add new bookmark */}
            <Dialog
              open={isOpen}
              onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                  setError("");
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="ml-auto shrink-0 rounded-md"
                  onClick={() => setIsOpen(true)}
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New bookmark
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Card className="border-none shadow-none">
                  <CardContent className="p-0 space-y-3 mt-4">
                    <div className="flex flex-col space-y-2">
                      <h1 className="font-semibold text-sm">
                        URL {""}
                        <span className="text-xs">(required)</span>
                      </h1>
                      <Input
                        id="url"
                        className="rounded-md"
                        placeholder="https://"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                    <div className="flex space-x-4">
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
                              selectedFolder ? selectedFolder.name : ""
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
                  </CardContent>
                </Card>
                <DialogFooter>
                  <div className="flex flex-col w-full">
                    {error && (
                      <div className="mb-3 text-sm text-red-500 flex items-center">
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
                    {createBookmark.isLoading ? (
                      <Button variant="outline" disabled className="w-full">
                        Saving
                        <LoadingCircleIcon className="w-4 h-4 ml-2 animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="custom_primary"
                        className="w-full"
                        onClick={() => {
                          if (!url.trim()) {
                            setError("Please enter a valid URL");
                            return;
                          }
                          createBookmark.mutate(createBookmarkData, {
                            onSuccess: () => {
                              setUrl("");
                              setSelectedTags([]);
                              setSelectedFolderId("");
                              setSelectedFolderName("Select");
                              setError("");
                            },
                          });
                        }}
                      >
                        Save changes
                      </Button>
                    )}
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div
          className={`grid ${
            isCardView ? "grid md:grid-cols-2 gap-4 mt-4" : "flex flex-col"
          }`}
        >
          {isLoadBookmarks ? (
            <>
              <BookmarkSkeleton />
              <BookmarkSkeleton />
            </>
          ) : bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              isCardView ? (
                <BookmarkCardView
                  bookmark={bookmark}
                  onDelete={() => deleteBookmark.mutate(bookmark.id)}
                  key={bookmark.id}
                />
              ) : (
                <BookmarkListView
                  bookmark={bookmark}
                  onDelete={() => deleteBookmark.mutate(bookmark.id)}
                  key={bookmark.id}
                />
              )
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No bookmarks available in this folder.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
