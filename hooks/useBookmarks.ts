import { useQuery } from "react-query";
import { getBookmark } from "@/app/utils/action";
import { BookmarkData } from "@/app/utils/definition";

export const useBookmarks = (
  userId: string,
  folderId?: string,
  query?: string
) => {
  const { data = [], isLoading } = useQuery<BookmarkData[]>({
    queryKey: ["bookmarks", userId, folderId, query],
    queryFn: () => getBookmark(userId, folderId, query),
    enabled: !!userId,
  });

  return { bookmarks: data, isLoading };
};

export default useBookmarks;
