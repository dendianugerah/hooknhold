import { useQuery } from "react-query";
import { getBookmark } from "@/app/utils/action";
import { BookmarkData } from "@/app/utils/definition";

export const useBookmarks = (
  userId: string,
  folderId?: string,
  query?: string
) => {
  const { data = [], isLoading, refetch } = useQuery<BookmarkData[]>({
    queryKey: ["bookmarks", userId, folderId, query],
    queryFn: () => getBookmark(userId, folderId, query),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return { bookmarks: data, isLoading, refetch };
};

export default useBookmarks;
