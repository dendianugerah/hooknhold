"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  PlusIcon,
  ShareIcon,
  BookmarkIcon,
  ChevronDownIcon,
  ArrowUpDownIcon,
  SlidersHorizontalIcon,
} from "@/components/icon";
import {
  Button,
  Card,
  CardContent,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui";

export default function Mind() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center justify-between lg:ml-[320px] xl:ml-[350px] gap-4 border-b px-6 dark:bg-gray-800/40">
          <span className="flex items-center font-semibold gap-x-2 text-lg">
            <BookmarkIcon className="h-6 w-6" />
            Bookmarks
          </span>
          <Button className="rounded-lg md:hidden">
            <ChevronDownIcon className="w-4 h-4" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                size="icon"
                variant="ghost"
              >
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
                />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ikan</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/"
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 md:pt-2 lg:ml-[320px] xl:ml-[350px]">
          <div className="flex items-center border-b py-2 justify-between">
            <div className="flex gap-x-2">
              <Button className="ml-auto shrink-0 rounded-xl" variant="outline">
                <SlidersHorizontalIcon className="mr-1 h-4 w-4 -translate-x-1" />
                Filter
                <span className="font-semibold text-xs ml-2 bg-[#0f6be9] text-white rounded-md px-[6px] py-0.5">
                  2
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="ml-auto shrink-0 rounded-xl"
                    variant="outline"
                  >
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value="tag">
                    <DropdownMenuRadioItem value="tag">
                      Tag (A-Z)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="tag-desc">
                      Tag (Z-A)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="newest">
                      Newest
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="oldest">
                      Oldest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex gap-x-2">
              <Button className="ml-auto shrink-0 rounded-xl" variant="outline">
                <ShareIcon className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="ml-auto shrink-0 rounded-xl" variant="outline">
                <PlusIcon className="w-4 h-4 mr-2" />
                Add new bookmark
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
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
            </Card>
            <Card>
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
                </div>
              </CardContent>
            </Card>
            <Card>
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
                </div>
              </CardContent>
            </Card>
            <Card>
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
                </div>
              </CardContent>
            </Card>
            <Card>
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
                </div>
              </CardContent>
            </Card>
            <Card>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
