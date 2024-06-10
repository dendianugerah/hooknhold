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
      queryClient.invalidateQueries(["folderData", userId], {
        refetchInactive: true,
      }); // folderData is the key for the query, refer to useFolders.ts
      queryClient.invalidateQueries(["bookmarkData", userId], {
        refetchInactive: true,
      }); // bookmarkData is the key for the query, refer to useBookmarks.ts
      onSuccessCallback();
    },
  });

  return deleteFolderMutation;
};

export default useDeleteFolder;
