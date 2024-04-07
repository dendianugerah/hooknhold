"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@/components/icon";
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
} from "@/components/ui";

export default function Mind() {
  return (
    <div className="flex w-full min-h-screen">
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center justify-end gap-4 border-b px-6 dark:bg-gray-800/40">
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

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:ml-[320px] xl:ml-[350px]">
          <div className="flex items-center">
            <h1 className="font-semibold text-lg md:text-2xl">Bookmarks</h1>
            <Button className="ml-auto" size="sm">
              Add new bookmark
            </Button>
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
