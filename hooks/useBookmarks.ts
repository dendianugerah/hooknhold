import { useQuery } from "react-query";
import { getBookmark } from "@/app/utils/action";
import { BookmarkData } from "@/app/utils/definition";
import { queryKeys } from "@/utils/queryKeys";

export const useBookmarks = (
  userId: string,
  folderId?: string,
  query?: string
) => {
  const { data = [], isLoading } = useQuery<BookmarkData[]>({
    queryKey: queryKeys.bookmarks(userId),
    queryFn: () => getBookmark(userId, folderId, query),
    enabled: !!userId,
  });

  return { bookmarks: data, isLoading };
};

export default useBookmarks;
