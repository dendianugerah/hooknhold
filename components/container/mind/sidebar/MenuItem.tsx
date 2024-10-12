import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui";
import { FolderIcon, Hash, MoreVertical } from "lucide-react";
import RenameItem from "./RenameItem";
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";

interface ItemDropdownMenuProps {
  itemId: string;
  handleDeleteClick: (id: string) => void;
  handleRenameClick: (id: string) => void;
}

function ItemDropdownMenu({
  itemId,
  handleDeleteClick,
  handleRenameClick,
}: ItemDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center">
          <MoreVertical className="h-4 w-4 text-black font-bold" />
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
              handleRenameClick(itemId);
              e.stopPropagation();
            }}
          >
            Rename
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            value="delete"
            className="pl-2 border-t"
            onClick={(e) => {
              handleDeleteClick(itemId);
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

interface MenuItemProps {
  item?: { id: string; name: string };
  items?: { id: string; name: string }[];
  handleDeleteClick: (id: string) => void;
  handleRenameClick: (id: string) => void;
  editingItem: string | null;
  onRename: (id: string, newName: string) => void;
  type: "folder" | "tag";
}

function MenuItem({
  item,
  items,
  handleDeleteClick,
  handleRenameClick,
  editingItem,
  onRename,
  type,
}: MenuItemProps) {
  const pathname = usePathname();
  const handleCancel = useCallback(() => {
    handleRenameClick("");
  }, [handleRenameClick]);

  const getIcon = (type: "folder" | "tag") => {
    return type === "folder" ? (
      <FolderIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
    ) : (
      <Hash className="h-4 w-4 flex-shrink-0 mt-0.5" />
    );
  };

  return (
    <>
      {item ? (
        <div key={item.id}>
          {editingItem === item.id ? (
            <RenameItem
              item={item}
              onRename={onRename}
              onCancel={handleCancel}
              type={type}
            />
          ) : (
            <Link
              className={`group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
              href={`/mind/${item.id}`}
            >
              <div className="flex items-start gap-3 flex-grow min-w-0">
                {getIcon(type)}
                <span
                  className={`break-words ${
                    pathname === `/mind/${item.id}`
                      ? "text-[#579DFF] dark:!text-[#579DFF]"
                      : ""
                  }`}
                >
                  {item.name}
                </span>
              </div>
              <span className="ml-2 flex-shrink-0 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                <ItemDropdownMenu
                  itemId={item.id}
                  handleDeleteClick={handleDeleteClick}
                  handleRenameClick={handleRenameClick}
                />
              </span>
            </Link>
          )}
        </div>
      ) : (
        items?.map((item) => (
          <div key={item.id}>
            {editingItem === item.id ? (
              <RenameItem
                item={item}
                onRename={onRename}
                onCancel={handleCancel}
                type={type}
              />
            ) : (
              <Link
                className={`group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50`}
                href={`/mind/${item.id}`}
              >
                <div className="flex items-start gap-3 flex-grow min-w-0">
                  {getIcon(type)}
                  <span
                    className={`break-words ${
                      pathname === `/mind/${item.id}`
                        ? "text-[#579DFF] dark:!text-[#579DFF]"
                        : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
                <span className="ml-2 flex-shrink-0 translate-x-0 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <ItemDropdownMenu
                    itemId={item.id}
                    handleDeleteClick={handleDeleteClick}
                    handleRenameClick={handleRenameClick}
                  />
                </span>
              </Link>
            )}
          </div>
        ))
      )}
    </>
  );
}

export default MenuItem;
