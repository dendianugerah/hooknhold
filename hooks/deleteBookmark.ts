import { useMutation, useQueryClient } from "react-query";
import { deleteBookmark } from "@/app/utils/action";

export const useDeleteBookmark = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const deleteBookmarkMutation = useMutation({
    mutationFn: (bookmarkId: string) => deleteBookmark(userId, bookmarkId),
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarkData", userId]); // bookmarkData is the key for the query, refer to useBookmarks.ts
      onSuccessCallback();
    },
  });

  return deleteBookmarkMutation;
};

export default useDeleteBookmark;