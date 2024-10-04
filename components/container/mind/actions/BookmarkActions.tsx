import BookmarkDialog from "../dialog/BookmarkDialog";
import { Button, Dialog, DialogTrigger, DialogContent } from "@/components/ui";
import { PlusIcon, ShareIcon } from "@/components/icon";
import { SparklesIcon } from "lucide-react";

interface BookmarkActionsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setIsRecommendationsOpen: (isOpen: boolean) => void;
  userId: string;
  isMindRoute: boolean;
}

export default function BookmarkActions({
  isOpen,
  setIsOpen,
  setIsRecommendationsOpen,
  userId,
  isMindRoute,
}: BookmarkActionsProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        className="p-2 md:px-4"
        onClick={() => setIsRecommendationsOpen(true)}
      >
        <SparklesIcon className="w-4 h-4 md:mr-2" />
        <span className="hidden md:inline">Recommend</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="p-2 md:px-4"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="w-4 h-4 md:mr-2" />
            <span className="hidden md:inline">New Bookmark</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <BookmarkDialog userId={userId} onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
      {!isMindRoute && (
        <Button className="p-2 md:px-4" variant="outline" disabled>
          <ShareIcon className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Share</span>
        </Button>
      )}
    </div>
  );
}
