import { Edit2, XIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface RenameItemProps {
  item: { id: string; name: string };
  onRename: (id: string, newName: string) => void;
  onCancel: () => void;
  type: "folder" | "tag";
}

function RenameItem({ item, onRename, onCancel, type }: RenameItemProps) {
  const [newName, setNewName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(e.target.value);
    },
    []
  );

  const handleInputBlur = useCallback(() => {
    if (newName.trim()) {
      onRename(item.id, newName.trim());
    }
    onCancel();
  }, [newName, onRename, item.id, onCancel]);

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && newName.trim()) {
        onRename(item.id, newName.trim());
        onCancel();
      } else if (e.key === "Escape") {
        onCancel();
      }
    },
    [newName, onRename, item.id, onCancel]
  );

  return (
    <div className="group flex justify-between items-center gap-3 w-full rounded-lg px-3 py-2 text-black transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
      <div className="flex items-center gap-3">
        <Edit2 className="h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={newName}
          onChange={handleInputChange}
          placeholder={item.name}
          className="bg-transparent outline-none text-black"
          autoFocus
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <button onClick={onCancel} onMouseDown={(e) => e.preventDefault()}>
        <XIcon className="h-4 w-4 text-black font-bold" />
      </button>
    </div>
  );
}

export default RenameItem;
