import { getFolder } from "@/app/utils/action";
import { FolderData } from "@/app/utils/definition";
import { useQuery } from "react-query";

export const useFolders = (userId: string) => {
  const { data, isLoading } = useQuery<FolderData[]>({
    queryKey: ["folders", userId],
    queryFn: async () => getFolder(userId),
    enabled: !!userId,
  });

  return { folders: data || [], isLoading };
};

export default useFolders;