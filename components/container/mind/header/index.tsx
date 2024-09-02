"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { BookmarkIcon } from "@/components/icon";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";

interface HeaderSectionProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HeaderSection({ isSidebarOpen, setIsSidebarOpen }: HeaderSectionProps) {
  const { data: session } = useSession();

  return (
    <header className="flex h-14 items-center justify-between lg:ml-[270px] xl:ml-[350px] gap-4 border-b px-6 dark:bg-gray-800/40 relative">
      <span className="flex items-center font-semibold gap-x-2 text-lg">
        <BookmarkIcon className="h-6 w-6" />
        Bookmarks
      </span>
      <section className="flex item-center gap-4">

      <button className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <HamburgerMenuIcon className="w-4 h-4" />
        <span className="sr-only">Toggle sidebar</span>
      </button>
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
          <DropdownMenuItem disabled>Settings</DropdownMenuItem>
          <DropdownMenuItem disabled>Support</DropdownMenuItem>
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
              </section>
    </header>
  );
}
