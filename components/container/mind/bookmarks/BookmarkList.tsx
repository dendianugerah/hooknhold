import BookmarkSkeleton from "@/components/skeleton/bookmark-skeleton";
import { BookmarkData } from "@/app/utils/definition";
import { BookmarkCardView } from "./BookmarkCardView";
import { BookmarkListView } from "./BookmarkListView";

interface BookmarkListProps {
  isLoadBookmarks: boolean;
  bookmarks: BookmarkData[];
  isCardView: boolean;
  onDelete: (id: string) => void;
}

export default function BookmarkList({
  isLoadBookmarks,
  bookmarks,
  isCardView,
  onDelete,
}: BookmarkListProps) {
  return (
    <div
      className={
        isCardView
          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
          : "flex flex-col space-y-4"
      }
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
              onDelete={onDelete}
              key={bookmark.id}
            />
          ) : (
            <BookmarkListView
              bookmark={bookmark}
              onDelete={onDelete}
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
  );
}
