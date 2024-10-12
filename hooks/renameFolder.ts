import { editFolder } from "@/app/utils/action";
import { queryKeys } from "@/app/utils/queryKeys";
import { useMutation, useQueryClient } from "react-query";

export const useRenameFolder = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const renameFolderMutation = useMutation({
    mutationFn: ({
      folderId,
      newName,
    }: {
      folderId: string;
      newName: string;
    }) => editFolder(userId, folderId, newName),
    onError: (error) => {
      console.error("Error editing folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.folders(userId));
      onSuccessCallback();
    },
  });

  return renameFolderMutation;
};

export default useRenameFolder;
