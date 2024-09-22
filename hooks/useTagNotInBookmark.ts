import { useQuery, useQueryClient } from "react-query";
import { getTagNotInBookmark } from "@/app/utils/action";
import { Option } from "@/components/ui/multiple-selector";

export const useTagsNotInBookmark = (userId: string, bookmarkId: string) => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<Option[]>({
    queryKey: ["tagNotInBookmark", userId, bookmarkId],
    queryFn: () => getTagNotInBookmark(userId, bookmarkId),
    enabled: !!userId && !!bookmarkId,
  });

  const options = data.map((tag) => ({
    id: tag.id as string,
    label: tag.name as string,
    value: tag.name as string,
  }));

  const invalidateTagsQuery = () => {
    queryClient.invalidateQueries(["tagNotInBookmark", userId, bookmarkId]);
  };

  return { options, isLoading, invalidateTagsQuery };
};

export default useTagsNotInBookmark;