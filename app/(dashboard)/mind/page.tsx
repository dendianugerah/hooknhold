"use client";
import { useContext, useState } from "react";
import { PlusIcon, ShareIcon, LoadingCircleIcon } from "@/components/icon";
import {
  Button,
  Dialog,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  Input,
} from "@/components/ui";
import { SearchContext } from "../layout";
import useUserId from "@/hooks/useUserId";
import useBookmarks from "@/hooks/useBookmarks";
import CardSection from "@/components/container/mind/card";
import HeaderSection from "@/components/container/mind/header";
import ControlSection from "@/components/container/mind/control";
import BookmarkSkeleton from "@/components/skeleton/bookmark-skeleton";
import useCreateBookmark from "@/hooks/createBookmark";
import { usePathname } from "next/navigation";

interface MindProps {
  folderId?: string;
}

export default function Mind({ folderId }: MindProps) {
  const userId = useUserId();
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { search } = useContext(SearchContext);
  const { bookmarks, isLoading: isLoadBookmarks } = useBookmarks(
    userId,
    folderId,
    search
  );
  const createBookmark = useCreateBookmark(userId, () => setIsOpen(false));
  const pathname = usePathname();
  const isMindRoute = pathname === "/mind";

  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col w-full">
        <HeaderSection />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-6 md:pt-2 lg:ml-[320px] xl:ml-[350px]">
          <div className="flex flex-col md:flex-row items-start md:items-center py-2 md:justify-between">
            <div>
              <ControlSection />
            </div>
            <div className="flex gap-x-2">
              {!isMindRoute && (
                <Button
                  className="ml-auto shrink-0 rounded-md"
                  variant="outline"
                >
                  <ShareIcon className="w-4 h-4 mr-2" />
                  Share
                </Button>
              )}
              {/* add new bookmark */}

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto shrink-0 rounded-md"
                    onClick={() => setIsOpen(true)}
                  >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    New bookmark
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <div className="flex flex-col py-4">
                    <div className="mb-4">
                      <label htmlFor="url" className="text-left px-2 py-2">
                        Enter URL
                      </label>
                      <Input
                        id="url"
                        placeholder="https://"
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    {createBookmark.isLoading ? (
                      <Button variant="outline" disabled>
                        Saving
                        <LoadingCircleIcon className="w-4 h-4 ml-2 animate-spin" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={() => createBookmark.mutate(url)}
                      >
                        Save changes
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* end of add new bookmark  */}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {/* <Card>
              <CardContent className="p-4">
                <div className="grid gap-1 text-sm">
                  <Link
                    className="font-semibold line-clamp-2 hover:underline"
                    href="#"
                  >
                    Tailwind CSS
                    <Image
                      src="/image/tailwind.png"
                      width={1200}
                      height={300}
                      alt="Tailwind image"
                      className="rounded-lg my-4"
                    />
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    A utility-first CSS framework for rapid UI development.
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Tags:
                    </span>
                    <div className="flex flex-wrap">
                      <span className="inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold leading-none text-gray-700 bg-gray-100 rounded-full">
                        Tailwind
                      </span>
                      <span className="inline-flex items-center px-2 py-1 mr-1 text-xs font-semibold leading-none text-gray-700 bg-gray-100 rounded-full">
                        CSS
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {isLoadBookmarks ? (
              <>
                <BookmarkSkeleton />
                <BookmarkSkeleton />
              </>
            ) : (
              bookmarks?.map((bookmark) => (
                <CardSection bookmark={bookmark} key={bookmark.id} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
