"use client";
import { SearchContext } from "../layout";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Option } from "@/components/ui/multiple-selector";
import { PlusIcon, ShareIcon, LoadingCircleIcon } from "@/components/icon";
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
import useTags from "@/hooks/useTags";
import useUserId from "@/hooks/useUserId";
import useFolders from "@/hooks/useFolder";
import useBookmarks from "@/hooks/useBookmarks";
import BookmarkCardSection from "@/components/container/mind/card";
import HeaderSection from "@/components/container/mind/header";
import ControlSection from "@/components/container/mind/control";
import BookmarkSkeleton from "@/components/skeleton/bookmark-skeleton";
import useCreateBookmark from "@/hooks/createBookmark";
import useDeleteBookmark from "@/hooks/deleteBookmark";
import useDeleteTag from "@/hooks/deleteTag";
interface MindProps {
  folderId?: string;
}

export default function Mind({ folderId }: MindProps) {
  const userId = useUserId();
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
  const createBookmarkData: any = {
    url: url,
  };

  if (selectedTags.length > 0) {
    createBookmarkData.tags = selectedTags.map((tag) => tag.value);
  }

  if (selectedFolderId) {
    createBookmarkData.folderId = selectedFolderId;
  }

  const deleteTag = useDeleteTag(userId);

  const pathname = usePathname();
  const isMindRoute = pathname === "/mind";

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col w-full">
        <HeaderSection />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-6 md:pt-2 lg:ml-[320px] xl:ml-[350px]">
          <div className="flex flex-col md:flex-row items-start md:items-center py-2 md:justify-between">
            <div>{/* <ControlSection /> */}</div>
            <div className="flex gap-x-2">
              {!isMindRoute && (
                <Button
                  className="ml-auto shrink-0 rounded-md"
                  variant="outline"
                >
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </Button>
              )}
              {/* add new bookmark */}

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                              placeholder="type to search tags..."
                              onDelete={(id: string) => {
                                deleteTag.mutate(id);
                              }}
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
                    {createBookmark.isLoading ? (
                      <Button variant="outline" disabled>
                        Saving
                        <LoadingCircleIcon className="w-4 h-4 ml-2 animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => {
                          createBookmark.mutate(createBookmarkData, {
                            onSuccess: () => {
                              setUrl("");
                              setSelectedTags([]);
                              setSelectedFolderId("");
                              setSelectedFolderName("Select");
                            },
                          });
                        }}
                      >
                        Save changes
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {isLoadBookmarks ? (
              <>
                <BookmarkSkeleton />
                <BookmarkSkeleton />
              </>
            ) : (
              bookmarks?.map((bookmark) => (
                <BookmarkCardSection
                  bookmark={bookmark}
                  onDelete={() => deleteBookmark.mutate(bookmark.id)}
                  key={bookmark.id}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
