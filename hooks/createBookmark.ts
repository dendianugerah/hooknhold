import { useMutation, useQueryClient } from "react-query";
import { addBookmark } from "@/app/utils/action";

export const useCreateBookmark = (
  userId: string,
  onSuccessCallback = () => {}
) => {
  const queryClient = useQueryClient();

  const createBookmark = useMutation({
    mutationFn: (url: string) => addBookmark(userId, url),
    onError: (error) => {
      console.error("Error creating bookmark:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarkData", userId]); // bookmarkData is the key for the query, refer to useBookmarks.ts
      onSuccessCallback();
    },
  });

  return createBookmark;
};

export default useCreateBookmark;
