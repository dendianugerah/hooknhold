import { Button, Input } from "@/components/ui";
import {
  PlusIcon,
  SearchIcon,
  FolderIcon,
  BookmarkIcon,
  Package2Icon,
  MoreVerticalIcon,
} from "@/components/icon";
import Link from "next/link";
import { useState } from "react";
import { X } from "lucide-react";
import useFolders from "@/hooks/useFolder";
import useUserId from "@/hooks/useUserId";
import useCreateFolder from "@/hooks/createFolder";

export default function SidebarSection() {
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");

  const userId = useUserId();
  const createFolder = useCreateFolder(userId, () =>
    setShowCreateFolder(false)
  );

  const { folders, isLoading } = useFolders(userId);
  return (
    <div className="hidden fixed h-full w-[320px] xl:w-[350px] border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span>Hooknhold</span>
          </Link>
        </div>
        <div className="flex-1 py-2">
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
              href="/mind"
            >
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </Link>

            {folders.length > 0 && (
              <p className="flex items-center gap-3 px-3 pt-6 pb-2 text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                Folder
              </p>
            )}
            <div className="overflow-y-auto max-h-96">
              {folders.map((folder) => (
                <Link
                  key={folder.id}
                  className="group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 "
                  href={`/mind/${folder.id}`}
                >
                  <div className="flex items-center gap-3">
                    <FolderIcon className="h-4 w-4" />
                    {folder.name}
                  </div>
                  <span className="translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                    <MoreVerticalIcon className="h-4 w-4 text-black font-bold" />
                  </span>
                </Link>
              ))}
            </div>
            {showCreateFolder && (
              <div className="group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-black transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <div className="flex items-center gap-3">
                  <FolderIcon className="h-4 w-4" />
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="New folder"
                    className="bg-transparent outline-none text-black"
                    autoFocus
                    onBlur={() => {
                      if (folderName) {
                        createFolder.mutate(folderName);
                        setFolderName("");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && folderName) {
                        createFolder.mutate(folderName);
                        setFolderName("");
                      }
                    }}
                  />
                </div>
                <button onClick={() => setShowCreateFolder(false)}>
                  <X className="h-4 w-4 text-black font-bold" />
                </button>
              </div>
            )}

            <Button
              className="flex items-center gap-3 px-3  text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 justify-between py-4 my-4 border-t bg-none"
              variant="none"
              onClick={() => setShowCreateFolder(true)}
            >
              Create folder
              <PlusIcon className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
