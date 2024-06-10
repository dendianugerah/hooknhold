import {
  Button,
  Input,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui";
import {
  PlusIcon,
  SearchIcon,
  BookmarkIcon,
  Package2Icon,
  FolderIcon,
} from "@/components/icon";
import { Hash } from "lucide-react";
import { SearchContext } from "@/app/(dashboard)/layout";
import { useCallback, useContext, useState } from "react";
import Link from "next/link";
import DeleteFolder from "./deleteFolder";
import CreateFolder from "./createFolder";
import useUserId from "@/hooks/useUserId";
import useFolders from "@/hooks/useFolder";
import useDeleteFolder from "@/hooks/deleteFolder";
import FolderMenu from "./folderMenu";
import useTags from "@/hooks/useTags";

function SearchBar({ setSearch }: { setSearch: (value: string) => void }) {
  return (
    <div className="w-full flex-1 mb-4">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-black dark:text-gray-400" />
        <Input
          className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
          placeholder="What are you looking for?"
          type="search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

export default function SidebarSection() {
  const userId = useUserId();
  const deleteFolder = useDeleteFolder(userId);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const { setSearch } = useContext(SearchContext);
  const { folders } = useFolders(userId);
  const { options: tags } = useTags(userId);

  const handleDeleteClick = useCallback((folderId: string) => {
    setSelectedFolderId(folderId);
    setShowDeleteAlert(true);
  }, []);

  return (
    <div className="hidden fixed h-full w-[320px] xl:w-[350px] border-r lg:block dark:bg-gray-800/40">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="h-6 w-6" />
            <span>Hooknhold</span>
          </Link>
        </div>
        <div className="flex-1 py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <SearchBar setSearch={setSearch} />

            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="/mind"
            >
              <BookmarkIcon className="h-4 w-4" />
              Bookmarks
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="folder">
                {folders.length > 0 && (
                  <AccordionTrigger
                    className="flex px-3 py-2 text-gray-500 transition-none hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                    id="folderAccordion"
                  >
                    <span className="flex gap-3 items-center">
                      <FolderIcon className="h-4 w-4 transition-none" />
                      Folder
                    </span>
                  </AccordionTrigger>
                )}
                <AccordionContent>
                  <div className="overflow-y-auto max-h-96 ml-3">
                    <FolderMenu
                      folders={folders}
                      handleDeleteClick={handleDeleteClick}
                    />
                    {folders.length > 0 && showCreateFolder && (
                      <CreateFolder
                        userId={userId}
                        showCreateFolder={showCreateFolder}
                        setShowCreateFolder={setShowCreateFolder}
                      />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                {tags.length > 0 && (
                  <>
                    <AccordionTrigger className="flex px-3 py-2 text-gray-500 transition-none hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50">
                      <span className="flex gap-3 items-center">
                        <Hash className="h-4 w-4 transition-none" />
                        Tag
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="overflow-y-auto max-h-96 ml-7">
                      {tags.map((tag) => (
                        <div key={tag.id}>{tag.label}</div>
                      ))}
                    </AccordionContent>
                  </>
                )}
              </AccordionItem>
            </Accordion>

            {folders.length === 0 && showCreateFolder && (
              <CreateFolder
                userId={userId}
                showCreateFolder={showCreateFolder}
                setShowCreateFolder={setShowCreateFolder}
              />
            )}

            <DeleteFolder
              open={showDeleteAlert}
              onClose={() => setShowDeleteAlert(false)}
              onDelete={() => {
                deleteFolder.mutate(selectedFolderId);
                setShowDeleteAlert(false);
              }}
            />

            <Button
              className="flex items-center gap-3 px-3  text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 justify-between py-4 my-4 border-t bg-none"
              variant="none"
              onClick={() => {
                setShowCreateFolder(true);
                const accordion = document.getElementById("folderAccordion");
                if (
                  accordion &&
                  accordion.getAttribute("aria-expanded") === "false"
                ) {
                  accordion.click();
                }
              }}
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
