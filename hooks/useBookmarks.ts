import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getBookmark } from "@/app/utils/action";
import { BookmarkData } from "@/app/utils/definition";

export const useBookmarks = (userId: string) => {
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["bookmarkData", userId],
    queryFn: () => getBookmark(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setBookmarks(data);
    }
  }, [data]);

  return { bookmarks, isLoading };
};

export default useBookmarks;
