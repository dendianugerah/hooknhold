import { useMutation, useQueryClient } from "react-query";
import { deleteFolder } from "@/app/utils/action";
import { queryKeys } from "@/utils/queryKeys";

export const useDeleteFolder = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: string) => deleteFolder(userId, folderId),
    onError: (error) => {
      console.error("Error deleting folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.folders(userId));
      queryClient.invalidateQueries(queryKeys.bookmarks(userId));
      onSuccessCallback();
    },
  });

  return deleteFolderMutation;
};

export default useDeleteFolder;
