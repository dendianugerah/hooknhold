import { useMutation, useQueryClient } from "react-query";
import { createTagInBookmark } from "@/app/utils/action";
import { queryKeys } from "@/app/utils/queryKeys";

export const useCreateTagInBookmark = (
    userId: string,
    bookmarkId: string,
    onSuccessCallback = () => {}
) => {
    const queryClient = useQueryClient();

    const createTagInBookmarkMutation = useMutation({
        mutationFn: (tagIds: string | string[]) => createTagInBookmark(userId, bookmarkId, tagIds),
        onSuccess: () => {
            queryClient.invalidateQueries(queryKeys.bookmarks(userId));
            onSuccessCallback();
        },
        onError: (error) => {
            console.error("Error creating tag:", error);
        }
    });

    return createTagInBookmarkMutation;
}

export default useCreateTagInBookmark;