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
  DialogHeader,
  DialogDescription,
  DialogTitle,
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
import { SparklesIcon, ExternalLinkIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";

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
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  const [bookmarkedRecommendations, setBookmarkedRecommendations] = useState<string[]>([]);

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

  const generateRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    // TODO: Implement AI-based recommendation generation
    // For now, we'll use dummy data
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRecommendations([
      'https://example.com/recommended1',
      'https://example.com/recommended2',
      'https://example.com/recommended3',
    ]);
    setIsGeneratingRecommendations(false);
  };

  const handleAddBookmark = async (url: string) => {
    setBookmarkedRecommendations([...bookmarkedRecommendations, url]);
    // TODO: Implement actual bookmark creation logic
    await createBookmark.mutateAsync({ url });
  };

  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 p-4 md:p-6 md:pt-2">
        <div className="flex md:flex-row items-center py-2 justify-between">
          <div className="flex items-center space-x-4">
            <ControlSection
              isCardView={isCardView}
              setIsCardView={setIsCardView}
            />
            <Button
              variant="outline"
              className="rounded-md"
              onClick={() => {
                setIsRecommendationsOpen(true);
                generateRecommendations();
              }}
            >
              <SparklesIcon className="w-4 h-4 mr-2" />
              Get Recommendations
            </Button>
          </div>
          <div className="flex gap-x-2">
            {!isMindRoute && (
              <Button className="ml-auto shrink-0 rounded-md" variant="outline" disabled>
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

        {/* Improved Recommendations Dialog */}
        <Dialog open={isRecommendationsOpen} onOpenChange={setIsRecommendationsOpen}>
          <DialogContent className="sm:max-w-[500px] p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Recommended Websites</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Based on your bookmarks and browsing history
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isGeneratingRecommendations ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-2">
                  <LoadingCircleIcon className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-sm text-gray-500">Generating recommendations...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recommendations.length > 0 ? (
                    recommendations.map((url, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                        <div className="flex-grow mr-4">
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm font-medium truncate block"
                          >
                            {url}
                          </a>
                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {/* You can add a brief description or reason for recommendation here */}
                            Recommended based on your interests
                          </p>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={bookmarkedRecommendations.includes(url) ? "secondary" : "outline"}
                                size="sm"
                                onClick={() => handleAddBookmark(url)}
                                disabled={bookmarkedRecommendations.includes(url)}
                              >
                                {bookmarkedRecommendations.includes(url) ? (
                                  <>
                                    <CheckIcon className="w-4 h-4 mr-1" />
                                    Saved
                                  </>
                                ) : (
                                  <>
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Save
                                  </>
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {bookmarkedRecommendations.includes(url) 
                                ? 'Bookmark saved' 
                                : 'Add to bookmarks'}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-sm text-gray-500">No recommendations available.</p>
                      <p className="text-xs text-gray-400 mt-2">Try refreshing or add more bookmarks to improve recommendations.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <DialogFooter className="flex justify-between items-center">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => generateRecommendations()}
                disabled={isGeneratingRecommendations}
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Refresh Recommendations
              </Button>
              <Button variant="default" size="sm" onClick={() => setIsRecommendationsOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}