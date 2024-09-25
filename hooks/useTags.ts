import { useQuery } from "react-query";
import { getTag } from "@/app/utils/action";
import { Option } from "@/components/ui/multiple-selector";

export const useTags = (userId: string) => {
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

  return { options, isLoading };
};

export default useTags;
