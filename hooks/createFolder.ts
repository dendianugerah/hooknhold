import { useMutation, useQueryClient } from "react-query";
import { addFolder } from "@/app/utils/action";
import { queryKeys } from "@/utils/queryKeys";

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
      queryClient.invalidateQueries(queryKeys.folders(userId));
      onSuccessCallback();
    },
  });

  return createFolder;
};

export default useCreateFolder;
