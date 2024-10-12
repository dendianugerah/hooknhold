import { useMutation, useQueryClient } from "react-query";
import { addBookmark } from "@/app/utils/action";
import { queryKeys } from "@/app/utils/queryKeys";

export const useCreateBookmark = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const createBookmark = useMutation({
    mutationFn: (data: { url: string; tags?: string[]; folderId?: string }) =>
      addBookmark(userId, data.url, data.tags, data.folderId),
    onError: (error) => {
      console.error("Error creating bookmark:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.bookmarks(userId));
      onSuccessCallback();
    },
  });

  return createBookmark;
};

export default useCreateBookmark;
