import { useMutation, useQueryClient } from "react-query";
import { deleteTag } from "@/app/utils/action";

export const useDeleteTag = (userId: string, onSuccessCallback = () => {}) => {
  const queryClient = useQueryClient();

  const deleteTagMutation = useMutation({
    mutationFn: (tagId: string) => deleteTag(userId, tagId),
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tagData", userId]); // tagData is the key for the query, refer to useTags.ts
      onSuccessCallback();
    },
  });

  return deleteTagMutation;
};

export default useDeleteTag;
