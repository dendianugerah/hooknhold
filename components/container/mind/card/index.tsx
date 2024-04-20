"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui";
import { BookmarkData } from "@/app/utils/definition";

export default function CardSection({ bookmark }: { bookmark: BookmarkData }) {
  return (
    <Card key={bookmark.id}>
      <CardContent className="p-4">
        <div className="grid gap-1 text-sm">
          <Link
            className="font-semibold line-clamp-2 hover:underline"
            href={bookmark.data.url}
            target="_blank"
          >
            {bookmark.data.title}
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
  );
}
