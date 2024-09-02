import { deleteTagInBookmark } from "@/app/utils/action";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteTagInBookmark = (userId: string, bookmarkId: string) => {
    const queryClient = useQueryClient();

    const deleteTagInBookmarkMutation = useMutation({
        mutationFn: (tagId: string) => deleteTagInBookmark(userId, bookmarkId, tagId),
        onError: (error) => {
            console.error("Error deleting tag:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bookmarkData", userId]);
        },
    })

    return deleteTagInBookmarkMutation;
}

export default useDeleteTagInBookmark;