import { editFolder } from "@/app/utils/action";
import { useMutation, useQueryClient } from "react-query";

const renameFolder = (userId: string, onSuccessCallback = () => {}) => {
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
      queryClient.invalidateQueries(["folderData", userId], {
        refetchInactive: true,
      });
      onSuccessCallback();
    },
  });

  return renameFolderMutation;
};

export default renameFolder;
