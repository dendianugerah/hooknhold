"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, Badge } from "@/components/ui";
import { BookmarkData } from "@/app/utils/definition";
import { DeleteConfirmationDialog } from "@/components/container/common/deleteConfirmationDialog";
import useUserId from "@/hooks/useUserId";
import useDeleteTagInBookmark from "@/hooks/deleteTagInBookmark";

export function BookmarkCardView({
  bookmark,
  onDelete,
}: {
  bookmark: BookmarkData;
  onDelete: () => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const userId = useUserId();
  const deleteTagInBookmark = useDeleteTagInBookmark(userId, bookmark.id);
  const hasTags = bookmark.tags.length > 0 && bookmark.tags[0] && Object.keys(bookmark.tags[0]).length > 0;

  const handleDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTag = (tagId: string) => {
    deleteTagInBookmark.mutate(tagId);
  };

  const handleAddTag = () => {
    // Logic to open tag selection dialog
    console.log("Open tag selection dialog");
  };

  return (
    <>
      <Card key={bookmark.id}>
        <CardContent className="p-4 group">
          <div className="grid gap-1 text-sm">
            <div className="mb-1">
              <h2 className=" flex items-center justify-between font-semibold line-clamp-2 text-lg">
                {bookmark.data.title}
                <div className="space-x-1">
                  <button onClick={handleAddTag}>
                    <Plus className="w-5 h-5 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all hover:text-gray-900 transition-colors" />
                  </button>
                  <button onClick={() => setIsDeleteDialogOpen(true)}>
                    <X className="w-5 h-5 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </h2>
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
              <Image
                src={bookmark.data.image}
                width={1200}
                height={300}
                alt={bookmark.data.title}
                className="rounded-lg my-4 shadow-sm"
              />
              <p className="text-sm dark:text-gray-400">
                {bookmark.data.description || "No description available."}
              </p>
            </div>
            <footer className="flex flex-wrap items-center justify-between">
              {hasTags && (
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
                        <button 
                          onClick={() => handleDeleteTag(tag.id)} 
                          className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ease-in-out"
                        >
                          <X className="w-3 h-3 hover:text-red-500 transition-colors" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <Badge variant="secondary" className="text-gray-700">
                  <span className="mr-2 rounded-full bg-[#579DFF] w-2 h-2"></span>
                  {new Date(bookmark.data.created_at).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </Badge>
              </div>
            </footer>
          </div>
        </CardContent>
      </Card>
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
        title="Are you sure you want to delete this bookmark?"
        description="This action cannot be undone. This will permanently delete the bookmark."
      />
    </>
  );
}

export function BookmarkListView({
  bookmark,
  onDelete,
}: {
  bookmark: BookmarkData;
  onDelete: () => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const hasTags = bookmark.tags.length > 0 && bookmark.tags[0] && Object.keys(bookmark.tags[0]).length > 0;

  const handleDelete = () => {
    onDelete();
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
      {hasTags && (
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
              <button 
                onClick={() => handleDeleteTag(tag.name)} 
                className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ease-in-out"
              >
                <X className="w-4 h-4 hover:text-red-500 transition-colors" />
              </button>
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
