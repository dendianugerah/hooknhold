import { useQuery, useQueryClient } from "react-query";
import { getTag } from "@/app/utils/action";
import { Option } from "@/components/ui/multiple-selector";
import { queryKeys } from "@/app/utils/queryKeys";

export const useTags = (userId: string) => {
  const queryClient = useQueryClient();

  const { data = [], isLoading } = useQuery<Option[]>({
    queryKey: ["tags", userId],
    queryFn: () => getTag(userId),
    enabled: !!userId,
  });

  const options = data.map((tag) => ({
    id: tag.id as string,
    label: tag.name as string,
    value: tag.name as string,
  }));
  
  const invalidateTags = () => {
    queryClient.invalidateQueries(queryKeys.tags(userId));
  };

  return { options, isLoading, invalidateTags };
};

export default useTags;
