import { useMutation, useQueryClient } from "react-query";
import { deleteFolder } from "@/app/utils/action";

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
      queryClient.invalidateQueries(["folderData", "bookmarkData", userId]); // folderData is the key for the query, refer to useFolders.ts
      onSuccessCallback();
    },
  });

  return deleteFolderMutation;
};

export default useDeleteFolder;