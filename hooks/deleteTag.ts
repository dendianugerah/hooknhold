import { useMutation, useQueryClient } from "react-query";
import { deleteTag } from "@/app/utils/action";
import { queryKeys } from "@/app/utils/queryKeys";

export const useDeleteTag = (userId: string) => {
  const queryClient = useQueryClient();

  const deleteTagMutation = useMutation({
    mutationFn: (tagId: string) => deleteTag(userId, tagId),
    onError: (error) => {
      console.error("Error deleting tag:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.tags(userId));
      queryClient.invalidateQueries(queryKeys.bookmarks(userId));
    },
  });

  return deleteTagMutation;
};

export default useDeleteTag;
