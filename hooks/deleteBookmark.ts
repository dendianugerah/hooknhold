import { useMutation, useQueryClient } from "react-query";
import { deleteBookmark } from "@/app/utils/action";
import { queryKeys } from "@/utils/queryKeys";

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
      queryClient.invalidateQueries(queryKeys.bookmarks(userId));
      onSuccessCallback();
    },
  });

  return deleteBookmarkMutation;
};

export default useDeleteBookmark;
