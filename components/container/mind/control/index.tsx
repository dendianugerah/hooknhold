"use client";
import { ArrowUpDownIcon, SlidersHorizontalIcon } from "@/components/icon";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui";

export default function ControlSection() {
  return (
    <div className="flex gap-x-2">
      <Button className="ml-auto shrink-0 rounded-md" variant="outline">
        <SlidersHorizontalIcon className="mr-1 h-4 w-4 -translate-x-1" />
        Filter
        <span className="font-semibold text-xs ml-2 bg-[#0f6be9] text-white rounded-md px-[6px] py-0.5">
          2
        </span>
      </Button>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="ml-auto shrink-0 rounded-md" variant="outline">
            <ArrowUpDownIcon className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuRadioGroup value="tag">
            <DropdownMenuRadioItem value="tag">Tag (A-Z)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tag-desc">
              Tag (Z-A)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">Oldest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
}
