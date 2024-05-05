"use client";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui";
import { BookmarkData } from "@/app/utils/definition";
import { Badge } from "@/components/ui/badge";
interface DeleteCardDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteCardDialog({ open, onClose, onDelete }: DeleteCardDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this bookmark?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            bookmark.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default function BookmarkCardSection({
  bookmark,
  onDelete,
}: {
  bookmark: BookmarkData;
  onDelete: () => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <Card key={bookmark.id}>
        <CardContent className="p-4 group">
          <div className="grid gap-1 text-sm">
            <div className="mb-1">
              <h2 className=" flex items-center justify-between font-semibold line-clamp-2">
                {bookmark.data.title}
                <button onClick={() => setIsDeleteDialogOpen(true)}>
                  <X className="w-4 h-4 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </button>
              </h2>
              <div className="flex items-center">
                <Link
                  href={bookmark.data.url}
                  target="_blank"
                  className="flex items-center text-[#579DFF] font-medium "
                >
                  View site
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
              {bookmark.tags.some((tag) => Object.keys(tag).length > 0) && (
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-700 dark:text-gray-400">
                    Tags:
                  </span>
                  <div className="flex flex-wrap">
                    {bookmark.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="mx-[2px] text-gray-700"
                      >
                        {tag.name}{" "}
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
      <DeleteCardDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
}
