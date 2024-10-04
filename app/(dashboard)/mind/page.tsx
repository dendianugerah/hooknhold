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
import { Button, Dialog, DialogContent, DialogTrigger } from "@/components/ui";
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
import BookmarkRecommendation from "@/components/container/mind/BookmarkRecommendation";
import BookmarkDialog from "@/components/container/mind/BookmarkDialog";
import { SparklesIcon } from "lucide-react";

interface MindProps {
  folderId?: string;
}

export default function Mind({ folderId }: MindProps) {
  const userId = useUserId();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

  const { search } = useContext(SearchContext);
  const { bookmarks, isLoading: isLoadBookmarks } = useBookmarks(
    userId,
    folderId,
    search
  );

  const deleteBookmark = useDeleteBookmark(userId);

  const pathname = usePathname();
  const isMindRoute = pathname === "/mind";

  return (
    <div className="flex w-full min-h-screen">
      <main className="flex-1 p-4 md:p-6 md:pt-2">
        <div className="flex flex-row items-center justify-between mb-4 space-x-2">
          <ControlSection
            isCardView={isCardView}
            setIsCardView={setIsCardView}
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="p-2 md:px-4"
              onClick={() => setIsRecommendationsOpen(true)}
            >
              <SparklesIcon className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Recommend</span>
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="p-2 md:px-4"
                  onClick={() => setIsOpen(true)}
                >
                  <PlusIcon className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">New Bookmark</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <BookmarkDialog
                  userId={userId}
                  onClose={() => setIsOpen(false)}
                />
              </DialogContent>
            </Dialog>
            {!isMindRoute && (
              <Button className="p-2 md:px-4" variant="outline" disabled>
                <ShareIcon className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
            )}
          </div>
        </div>
        <div
          className={`grid ${
            isCardView
              ? "grid-cols-1 md:grid-cols-2 gap-4"
              : "flex flex-col space-y-4"
          }`}
        >
          {isLoadBookmarks ? (
            <>
              <BookmarkSkeleton />
              <BookmarkSkeleton />
            </>
          ) : bookmarks && bookmarks.length > 0 ? (
            bookmarks.map((bookmark) =>
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
            )
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No bookmarks available in this folder.
              </p>
            </div>
          )}
        </div>
        <BookmarkRecommendation
          isOpen={isRecommendationsOpen}
          setIsOpen={setIsRecommendationsOpen}
        />
      </main>
    </div>
  );
}
