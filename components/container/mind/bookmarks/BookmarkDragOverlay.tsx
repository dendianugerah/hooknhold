import React from "react";
import { BookmarkIcon } from "@/components/icon";

interface BookmarkDragOverlayProps {
  title: string;
}

export function BookmarkDragOverlay({ title }: BookmarkDragOverlayProps) {
  return (
    <div className="bg-white border-2 border-blue-500 rounded-md shadow-lg p-3 flex items-center space-x-3 max-w-[300px] min-w-[200px] bg-opacity-90">
      <BookmarkIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
      <span className="text-sm font-medium text-black truncate flex-grow">
        {title || "Untitled"}
      </span>
    </div>
  );
}
