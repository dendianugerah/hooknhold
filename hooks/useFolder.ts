import { useState, useEffect } from "react";
import { getFolder } from "@/app/utils/action";
import { FolderData } from "@/app/utils/definition";
import { useQuery } from "react-query";

export const useFolders = (userId: string) => {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["folderData", userId],
    queryFn: () => getFolder(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setFolders(data);
    }
  }, [data]);

  return { folders, isLoading };
};

export default useFolders;
