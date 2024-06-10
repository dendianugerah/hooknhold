import { useMutation, useQueryClient } from "react-query";
import { addFolder } from "@/app/utils/action";

export const useCreateFolder = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const createFolder = useMutation({
    mutationFn: (folderName: string) => addFolder(userId, folderName),
    onError: (error) => {
      console.error("Error creating folder:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["folderData", userId], {
        refetchInactive: true,
      }); // folderData is the key for the query, refer to useFolders.ts
      onSuccessCallback();
    },
  });

  return createFolder;
};

export default useCreateFolder;
