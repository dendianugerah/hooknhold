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
import { useDroppable } from "@dnd-kit/core";
import { SearchContext } from "@/app/(dashboard)/layout";
import { useCallback, useContext, useState } from "react";
import {
  useTags,
  useFolders,
  useRenameTag,
  useDeleteFolder,
  useRenameFolder,
  useDeleteTag,
} from "@/hooks";
import { DeleteConfirmationDialog } from "@/components/container/mind/dialog/DeleteConfirmationDialog";
import Link from "next/link";
import useUserId from "@/hooks/useUserId";
import CreateFolder from "./CreateFolder";
import MenuItem from "./MenuItem";
import { AccordionContext } from "@/app/(dashboard)/layout";

interface Folder {
  id: string;
  name: string;
}

interface FolderItemProps {
  folder: Folder;
  handleDeleteClick: (id: string) => void;
  handleRenameClick: (id: string) => void;
  editingItem: string | null;
  onRename: (id: string, newName: string) => void;
}

function SearchBar({ setSearch }: { setSearch: (value: string) => void }) {
  return (
    <div className="w-full flex-1 mb-4 relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-black dark:text-gray-400" />
      <Input
        className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
        placeholder="What are you looking for?"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

function FolderItem({
  folder,
  handleDeleteClick,
  handleRenameClick,
  editingItem,
  onRename,
}: FolderItemProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: folder.id,
    data: { type: "folder", folder },
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-colors duration-200 ${
        isOver ? "bg-blue-100 dark:bg-blue-800" : ""
      }`}
    >
      <MenuItem
        item={folder}
        handleDeleteClick={handleDeleteClick}
        handleRenameClick={handleRenameClick}
        editingItem={editingItem}
        onRename={onRename}
        type="folder"
      />
    </div>
  );
}

export default function Sidebar({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const userId = useUserId();
  const deleteFolder = useDeleteFolder(userId);
  const deleteTag = useDeleteTag(userId);
  const editFolder = useRenameFolder(userId);
  const editTag = useRenameTag(userId);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showDeleteFolderAlert, setShowDeleteFolderAlert] = useState(false);
  const [showDeleteTagAlert, setShowDeleteTagAlert] = useState(false);
  const [editFolderId, setEditFolderId] = useState<string | null>(null);
  const [editTagId, setEditTagId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [selectedTagId, setSelectedTagId] = useState("");
  const { setSearch } = useContext(SearchContext);
  const { folders } = useFolders(userId);
  const { options: tags } = useTags(userId);
  const { openItems, setOpenItems } = useContext(AccordionContext);

  const handleDeleteFolderClick = useCallback((folderId: string) => {
    setSelectedFolderId(folderId);
    setShowDeleteFolderAlert(true);
  }, []);

  const handleDeleteTagClick = useCallback((tagId: string) => {
    setSelectedTagId(tagId);
    setShowDeleteTagAlert(true);
  }, []);

  const handleFolderRename = useCallback(
    (folderId: string, newName: string) => {
      editFolder.mutate({ folderId, newName });
      setEditFolderId(null);
    },
    [editFolder]
  );

  const handleTagRename = useCallback(
    (tagId: string, newName: string) => {
      editTag.mutate({ tagId, newName });
      setEditTagId(null);
    },
    [editTag]
  );

  const handleCreateFolderClick = useCallback(() => {
    setShowCreateFolder(true);
    const accordion = document.getElementById("folderAccordion");
    if (accordion && accordion.getAttribute("aria-expanded") === "false") {
      accordion.click();
    }
  }, []);

  const handleAccordionChange = (type: string) => {
    setOpenItems((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const renderAccordion = (type: "folder" | "tag") => {
    const items =
      type === "folder"
        ? folders
        : tags.map((tag) => ({ id: tag.id, name: tag.label }));
    const icon =
      type === "folder" ? (
        <FolderIcon className="h-4 w-4 transition-none" />
      ) : (
        <Hash className="h-4 w-4 transition-none" />
      );
    const title = type === "folder" ? "Folder" : "Tag";
    const handleDelete =
      type === "folder" ? handleDeleteFolderClick : handleDeleteTagClick;
    const handleRename =
      type === "folder" ? handleFolderRename : handleTagRename;
    const editingItem = type === "folder" ? editFolderId : editTagId;
    const setEditingItem = type === "folder" ? setEditFolderId : setEditTagId;

    return (
      <Accordion 
        type="single" 
        collapsible 
        className="w-full"
        value={openItems[type] ? type : undefined}
        onValueChange={() => handleAccordionChange(type)}
      >
        <AccordionItem value={type}>
          <AccordionTrigger
            className="flex px-3 py-2 text-gray-500 transition-none hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
            id={`${type}Accordion`}
          >
            <span className="flex gap-3 items-center">
              {icon}
              {title}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="overflow-y-auto max-h-96 ml-3">
              {type === "folder" ? (
                (items as Folder[]).map((folder) => (
                  <FolderItem
                    key={folder.id}
                    folder={folder}
                    handleDeleteClick={handleDelete}
                    handleRenameClick={setEditingItem}
                    editingItem={editingItem}
                    onRename={handleRename}
                  />
                ))
              ) : (
                <MenuItem
                  items={items}
                  handleDeleteClick={handleDelete}
                  handleRenameClick={setEditingItem}
                  editingItem={editingItem}
                  onRename={handleRename}
                  type={type}
                />
              )}
              {type === "folder" && folders.length > 0 && showCreateFolder && (
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
    );
  };

  return (
    <div
      className={`fixed h-full w-[270px] xl:w-[350px] border-r lg:block dark:bg-gray-800/40 top-0 bg-white z-50 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
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
              All Bookmarks
            </Link>

            {renderAccordion("folder")}
            {renderAccordion("tag")}

            {folders.length === 0 && showCreateFolder && (
              <CreateFolder
                userId={userId}
                showCreateFolder={showCreateFolder}
                setShowCreateFolder={setShowCreateFolder}
              />
            )}

            <DeleteConfirmationDialog
              open={showDeleteFolderAlert}
              onClose={() => setShowDeleteFolderAlert(false)}
              onDelete={() => {
                deleteFolder.mutate(selectedFolderId);
                setShowDeleteFolderAlert(false);
              }}
              title="Are you sure you want to delete this folder?"
              description="This action cannot be undone. This will permanently delete the folder and all bookmarks inside it."
            />

            <DeleteConfirmationDialog
              open={showDeleteTagAlert}
              onClose={() => setShowDeleteTagAlert(false)}
              onDelete={() => {
                deleteTag.mutate(selectedTagId);
                setShowDeleteTagAlert(false);
              }}
              title="Are you sure you want to delete this tag?"
              description="This action cannot be undone. This will permanently delete the tag from all bookmarks."
            />

            <Button
              className="flex items-center gap-3 px-3 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 justify-between py-4 my-4 border-t bg-none"
              variant="none"
              onClick={handleCreateFolderClick}
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
