import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui";
import { FolderIcon, MoreVerticalIcon } from "@/components/icon";
import { FolderData } from "@/app/utils/definition";

interface FolderDropdownMenuProps {
  folderId: string;
  handleDeleteClick: (id: string) => void;
  handleRenameClick: (id: string) => void;
}

function FolderDropdownMenu({
  folderId,
  handleDeleteClick,
  handleRenameClick,
}: FolderDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center">
          <MoreVerticalIcon className="h-4 w-4 text-black font-bold" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-300}
        className="w-[200px] overflow-auto"
      >
        <DropdownMenuRadioGroup>
          <DropdownMenuRadioItem
            value="rename"
            className="pl-2"
            onClick={(e) => {
              handleRenameClick(folderId);
              e.stopPropagation();
            }}
          >
            Rename
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="delete"
            className="pl-2 border-t"
            onClick={(e) => {
              handleDeleteClick(folderId);
              e.stopPropagation();
            }}
          >
            Delete
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface FolderMenuProps {
  folders: FolderData[];
  handleDeleteClick: (id: string) => void;
}

function FolderMenu({ folders, handleDeleteClick }: FolderMenuProps) {
  return (
    <>
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
            <FolderDropdownMenu
              folderId={folder.id}
              handleDeleteClick={handleDeleteClick}
              handleRenameClick={(id) => console.log(id)}
            />
          </span>
        </Link>
      ))}
    </>
  );
}

export default FolderMenu;
