"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { BookmarkIcon, ChevronDownIcon } from "@/components/icon";
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

export default function HeaderSection() {
  const { data: session } = useSession();

  return (
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
              src={session?.user?.image as string}
              style={{
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
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
  );
}
