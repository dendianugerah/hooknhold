import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui";
import { LoadingCircleIcon } from "@/components/icon";
import { CheckIcon, PlusIcon, SparklesIcon, XIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookmarkRecommendationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function BookmarkRecommendation({
  isOpen,
  setIsOpen,
}: BookmarkRecommendationProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);
  const [bookmarkedRecommendations, setBookmarkedRecommendations] = useState<
    string[]
  >([]);

  const generateRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    // TODO: Implement AI-based recommendation generation
    // For now, we'll use dummy data
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setRecommendations([
      "https://example.com/recommended1",
      "https://example.com/recommended2",
      "https://example.com/recommended3",
    ]);
    setIsGeneratingRecommendations(false);
  };

  const handleAddBookmark = (url: string) => {
    // TODO: Implement bookmark saving logic
    setBookmarkedRecommendations((prev) => [...prev, url]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-5 sm:p-6 max-w-xl w-full">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl sm:text-2xl font-semibold">
            Recommended Websites
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Based on your bookmarks history
          </DialogDescription>
        </DialogHeader>
        <div className="py-3 sm:py-4">
          {isGeneratingRecommendations ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-2">
              <LoadingCircleIcon className="w-10 h-10 animate-spin text-primary" />
              <p className="text-sm text-gray-500">
                Generating recommendations...
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[55vh] overflow-y-auto">
              {recommendations.length > 0 ? (
                recommendations.map((url, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 sm:py-3 border-b last:border-b-0"
                  >
                    <div className="flex-grow mr-3 sm:mr-4">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm font-medium truncate block"
                      >
                        {url}
                      </a>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        Recommended based on your interests
                      </p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              bookmarkedRecommendations.includes(url)
                                ? "secondary"
                                : "outline"
                            }
                            size="sm"
                            className="px-2 py-1 h-auto text-xs"
                            onClick={() => handleAddBookmark(url)}
                            disabled={bookmarkedRecommendations.includes(url)}
                          >
                            {bookmarkedRecommendations.includes(url) ? (
                              <CheckIcon className="w-3 h-3 mr-1" />
                            ) : (
                              <PlusIcon className="w-3 h-3 mr-1" />
                            )}
                            {bookmarkedRecommendations.includes(url)
                              ? "Saved"
                              : "Add"}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {bookmarkedRecommendations.includes(url)
                            ? "Bookmark saved"
                            : "Add to bookmarks"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">
                    No recommendations available.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Try refreshing or add more bookmarks to improve
                    recommendations.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 mt-3">
          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto px-3 py-1"
            onClick={() => setIsOpen(false)}
          >
            <XIcon className="w-3 h-3 mr-1" />
            Close
          </Button>
          <Button
            variant="custom_primary"
            size="sm"
            className="w-full sm:w-auto px-3 py-1"
            onClick={() => generateRecommendations()}
            disabled={isGeneratingRecommendations}
          >
            <SparklesIcon className="w-3 h-3 mr-1" />
            Refresh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
