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
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
} from "@dnd-kit/core";
import { useUpdateBookmarkFolder } from "@/hooks/useUpdateBookmarkFolder";
import { BookmarkDragOverlay } from "@/components/container/mind/bookmarks/BookmarkDragOverlay";
import SidebarSection from "@/components/container/mind/sidebar";

interface MindProps {
  folderId?: string;
}

export default function Mind({ folderId }: MindProps) {
  const userId = useUserId();
  const [isOpen, setIsOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
  // const [activeId, setActiveId] = useState<string | null>(null);
  const updateBookmarkFolder = useUpdateBookmarkFolder(userId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTitle, setDraggedTitle] = useState<string | null>(null);

  const { search } = useContext(SearchContext);
  const { bookmarks, isLoading: isLoadBookmarks } = useBookmarks(
    userId,
    folderId,
    search
  );

  const deleteBookmark = useDeleteBookmark(userId);

  const pathname = usePathname();
  const isMindRoute = pathname === "/mind";

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    // setActiveId(active.id as string);
    setDraggedTitle(active.data.current?.title || "Untitled");
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (
      over &&
      active.data.current?.type === "bookmark" &&
      over.data.current?.type === "folder"
    ) {
      updateBookmarkFolder.mutate({
        bookmarkId: active.id as string,
        folderId: over.id as string,
      });
    }
    // setActiveId(null);
    setDraggedTitle(null);
    setIsDragging(false);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={`flex ${isDragging ? "cursor-grabbing" : ""}`}>
        <SidebarSection isSidebarOpen={isSidebarOpen} />
        <main
          className={`flex-1 p-4 md:p-6 md:pt-2 lg:ml-[270px] xl:ml-[350px] ${
            isDragging ? "opacity-50" : ""
          }`}
        >
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
      <div className="fixed inset-0 pointer-events-none z-50">
        <DragOverlay>
          {isDragging && draggedTitle && (
            <BookmarkDragOverlay title={draggedTitle} />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
