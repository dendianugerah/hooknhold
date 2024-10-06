import { editTag } from "@/app/utils/action";
import { queryKeys } from '@/utils/queryKeys';
import { useMutation, useQueryClient } from "react-query";

export const useRenameTag = (userId: string, onSuccessCallback = () => {}) => {
  const queryClient = useQueryClient();

  const renameFolderMutation = useMutation({
    mutationFn: ({ tagId, newName }: { tagId: string; newName: string }) =>
      editTag(userId, tagId, newName),
    onError: (error) => {
      console.error("Error editing folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.tags(userId));
      queryClient.invalidateQueries(queryKeys.bookmarks(userId));
      queryClient.invalidateQueries(["tagNotInBookmark", userId]);
      onSuccessCallback();
    },
  });

  return renameFolderMutation;
};

export default useRenameTag;
