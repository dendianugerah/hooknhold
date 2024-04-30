"use client";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
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
            Are you sure you want to delete this card?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the card.
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

export default function CardSection({
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
        <CardContent className="p-4">
          <div className="grid gap-1 text-sm">
            <span className="group flex items-center justify-between font-semibold line-clamp-2">
              {bookmark.data.title}
              <button onClick={() => setIsDeleteDialogOpen(true)}>
                <X className="w-4 h-4 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </button>
            </span>
            <Link href={bookmark.data.url} target="_blank">
              <Image
                src={bookmark.data.image}
                width={1200}
                height={300}
                alt={bookmark.data.title}
                className="rounded-lg my-4 shadow-sm"
              />
            </Link>
            <p className="text-sm dark:text-gray-400">
              {bookmark.data.description || "No description available."}
            </p>
            {bookmark.tags.some((tag) => Object.keys(tag).length > 0) && (
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Tags:
                </span>
                <div className="flex flex-wrap">
                  {bookmark.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold leading-none text-gray-700 bg-gray-100 rounded-full"
                    >
                      {tag.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
