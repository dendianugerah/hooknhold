import Link from "next/link";
import Image from "next/image";
import { BookmarkData } from "@/app/utils/definition";
import { ChevronRight, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import {
  Badge,
  Card,
  CardContent,
  MultipleSelector,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "@/components/ui";
import { Option } from "@/components/ui/multiple-selector";
import { DeleteConfirmationDialog } from "@/components/container/mind/dialog/deleteConfirmationDialog";
import {
  useTagsNotInBookmark,
  useDeleteTagInBookmark,
  useCreateTagInBookmark,
} from "@/hooks";
import useUserId from "@/hooks/useUserId";

interface BookmarkCardViewProps {
  bookmark: BookmarkData;
  onDelete: (id: string) => void; // Changed to accept id
}

export function BookmarkCardView({
  bookmark,
  onDelete,
}: BookmarkCardViewProps) {
  const userId = useUserId();
  const { options, invalidateTagsQuery } = useTagsNotInBookmark(
    userId,
    bookmark.id
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeletingTag, setIsDeletingTag] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const createTagInBookmark = useCreateTagInBookmark(userId, bookmark.id);
  const deleteTagInBookmark = useDeleteTagInBookmark(userId, bookmark.id);
  const hasTags = bookmark.tags && bookmark.tags.length > 0;

  const handleDelete = () => {
    onDelete(bookmark.id); // Pass the bookmark id
    setIsDeleteDialogOpen(false);
  };

  const handleDeleteTag = (tagId: string) => {
    setIsDeletingTag(tagId);
    deleteTagInBookmark.mutate(tagId, {
      onSuccess() {
        invalidateTagsQuery();
        setIsDeletingTag(null);
      },
      onError() {
        setIsDeletingTag(null);
      },
    });
  };

  const handleAddTag = () => {
    if (selectedTags.length > 0) {
      const tagIds = selectedTags
        .map((tag) => tag.id)
        .filter((id): id is string => id !== undefined);
      createTagInBookmark.mutate(tagIds, {
        onSuccess: () => {
          setSelectedTags([]);
          setIsPopoverOpen(false);
          invalidateTagsQuery();
        },
        onError: (error) => {
          console.error("Error adding tags:", error);
        },
      });
    }
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
                  <button onClick={() => setIsDeleteDialogOpen(true)}>
                    <X className="w-5 h-5 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 hover:text-red-500 transition-colors" />
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
              <div className="flex items-center space-x-2">
                {hasTags && bookmark.tags && (
                  <>
                    <span className="text-xs text-[#579DFF] font-semibold dark:text-gray-400">
                      Tags:
                    </span>
                    <div className="flex flex-wrap items-center gap-1">
                      {bookmark.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-gray-700 flex items-center transition-all duration-200 ease-in-out"
                        >
                          <span className="mr-1">{tag.name}</span>
                          <button
                            onClick={() => handleDeleteTag(tag.id)}
                            disabled={isDeletingTag === tag.id}
                            className="opacity-0 group-hover:opacity-100 w-0 group-hover:w-3 overflow-hidden transition-all duration-200 ease-in-out"
                          >
                            {isDeletingTag === tag.id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <X className="w-3 h-3 hover:text-red-500 transition-colors" />
                            )}
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
                <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                  <PopoverTrigger asChild>
                    <button className="items-center h-auto p-0 flex text-xs text-gray-400 hover:text-[#579DFF] opacity-0 group-hover:opacity-100">
                      <Plus className="w-3 h-3 mr-1" />
                      {hasTags ? "Add more" : "Add tag"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="flex" align="start">
                    <div className="flex items-center space-x-4 justify-between">
                      <MultipleSelector
                        placeholder="type to search tags..."
                        defaultOptions={options}
                        value={selectedTags}
                        onChange={(value: Option[]) => setSelectedTags(value)}
                      />
                      <Button
                        size="sm"
                        variant="custom_primary"
                        onClick={handleAddTag}
                        disabled={
                          selectedTags.length === 0 ||
                          createTagInBookmark.isLoading
                        }
                        isLoading={createTagInBookmark.isLoading}
                        className="whitespace-nowrap ml-2"
                      >
                        {createTagInBookmark.isLoading
                          ? "Saving..."
                          : "Save tag"}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
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
