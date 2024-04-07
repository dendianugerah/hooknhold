import { Input } from "@/components/ui";
import {
  BookmarkIcon,
  FolderIcon,
  Package2Icon,
  PlusIcon,
  SearchIcon,
} from "@/components/icon";

import Link from "next/link";

export default function SidebarSection() {

  return (
    <div className="hidden fixed h-full w-[320px] xl:w-[350px] border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="">Hooknhold</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <div className="w-full flex-1 mb-4">
              <form>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-black dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                    placeholder="What are you looking for?"
                    type="search"
                  />
                </div>
              </form>
            </div>
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </Link>
            <p className="flex items-center gap-3 px-3 pt-6 pb-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              Folder
            </p>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <FolderIcon className="h-4 w-4" />
              Personal
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <FolderIcon className="h-4 w-4" />
              Work
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <FolderIcon className="h-4 w-4" />
              Inspiration
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-4 my-4 text-gray-900 transition-all border-t"
              href="#"
            >
              <PlusIcon className="h-4 w-4" />
              Create folder
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* <Card>
              <CardHeader className="pb-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support team
                </CardDescription>
                <CardDescription>Card kuota left: 45</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="sm">
                  Upgrade
                </Button>
              </CardContent>
            </Card> */}
        </div>
      </div>
    </div>
  );
}
