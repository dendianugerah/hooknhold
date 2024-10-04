import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui";
import { ChevronRight, X } from "lucide-react";
import { BookmarkData } from "@/app/utils/definition";
import { DeleteConfirmationDialog } from "@/components/container/mind/dialog/deleteConfirmationDialog";

interface BookmarkListViewProps {
  bookmark: BookmarkData;
  onDelete: (id: string) => void;
}

export function BookmarkListView({
  bookmark,
  onDelete,
}: BookmarkListViewProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const hasTags = bookmark.tags && bookmark.tags.length > 0;

  const handleDelete = () => {
    onDelete(bookmark.id);
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTag = (tagId: string) => {
    // Logic to delete tag will be implemented later
  };

  return (
    <div className="p-2 border-b border-gray-200 group">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold line-clamp-2">{bookmark.data.title}</h2>
        <button onClick={() => setIsDeleteDialogOpen(true)}>
          <X className="w-4 h-4 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
        </button>
      </div>
      <div className="flex flex-wrap justify-between items-center text-xs mb-2">
        <div className="flex items-center">
          <Link
            href={bookmark.data.url}
            target="_blank"
            className="flex items-center text-[#579DFF] font-medium "
          >
            Visit site
            <ChevronRight className="w-4 h-4 ml-[2px] transition-transform duration-200 group-hover:translate-x-1 hover:font-bold" />
          </Link>
        </div>
      </div>
      <div className="flex justify-between flex-wrap items-center mt-2">
        {hasTags && bookmark.tags && (
          <div className="flex items-center space-x-1">
            <span className="text-xs text-[#579DFF] font-semibold dark:text-gray-400">
              Tags:
            </span>
            <div className="flex flex-wrap items-center space-x-1">
              {bookmark.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-gray-700 flex items-center transition-all duration-200 ease-in-out"
                >
                  <span className="mr-1 gap-x-2">{tag.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <p className="text-xs text-gray-500">
          {new Date(bookmark.data.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        title="Are you sure you want to delete this bookmark?"
        description="This action cannot be undone. This will permanently delete the bookmark."
      />
    </div>
  );
}
