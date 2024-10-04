"use client";
import useUserId from "@/hooks/useUserId";
import ControlSection from "@/components/container/mind/control";
import BookmarkList from "@/components/container/mind/bookmarks/BookmarkList";
import BookmarkActions from "@/components/container/mind/actions/BookmarkActions";
import BookmarkRecommendation from "@/components/container/mind/dialog/BookmarkRecommendationDialog";
import { SearchContext } from "../layout";
import { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { useDeleteBookmark, useBookmarks } from "@/hooks";

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
          <BookmarkActions
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setIsRecommendationsOpen={setIsRecommendationsOpen}
            userId={userId}
            isMindRoute={isMindRoute}
          />
        </div>
        <BookmarkList
          isLoadBookmarks={isLoadBookmarks}
          bookmarks={bookmarks}
          isCardView={isCardView}
          onDelete={(id) => deleteBookmark.mutate(id)}
        />
        <BookmarkRecommendation
          isOpen={isRecommendationsOpen}
          setIsOpen={setIsRecommendationsOpen}
        />
      </main>
    </div>
  );
}
