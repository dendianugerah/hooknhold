import { useMutation, useQueryClient } from "react-query";
import { createTagInBookmark } from "@/app/utils/action";

export const useCreateTagInBookmark = (
    userId: string,
    bookmarkId: string,
    onSuccessCallback = () => {}
) => {
    const queryClient = useQueryClient();

    const createTagInBookmarkMutation = useMutation({
        mutationFn: (tagIds: string | string[]) => createTagInBookmark(userId, bookmarkId, tagIds),
        onSuccess: () => {
            queryClient.invalidateQueries(["bookmarkData", userId]);
            onSuccessCallback();
        },
        onError: (error) => {
            console.error("Error creating tag:", error);
        }
    });

    return createTagInBookmarkMutation;
}

export default useCreateTagInBookmark;