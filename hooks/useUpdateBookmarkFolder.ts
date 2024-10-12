import { useMutation, useQueryClient } from "react-query";
import { updateBookmarkFolder } from "@/app/utils/action";
import { queryKeys } from "@/app/utils/queryKeys";

export const useUpdateBookmarkFolder = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ bookmarkId, folderId }: { bookmarkId: string; folderId: string }) =>
      updateBookmarkFolder(userId, bookmarkId, folderId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.bookmarks(userId));
        queryClient.invalidateQueries(queryKeys.folders(userId))
      },
    }
  );
};