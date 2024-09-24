import { editTag } from "@/app/utils/action";
import { useMutation, useQueryClient } from "react-query";

const renameTag = (userId: string, onSuccessCallback = () => {}) => {
  const queryClient = useQueryClient();

  const renameFolderMutation = useMutation({
    mutationFn: ({ tagId, newName }: { tagId: string; newName: string }) =>
      editTag(userId, tagId, newName),
    onError: (error) => {
      console.error("Error editing folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tags");
      onSuccessCallback();
    },
  });

  return renameFolderMutation;
};

export default renameTag;
