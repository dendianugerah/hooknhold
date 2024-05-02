import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getTag } from "@/app/utils/action";
import { Option } from "@/components/ui/multiple-selector";

export const useTags = (userId: string) => {
  const [tags, setTags] = useState<Option[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["tagData", userId],
    queryFn: () => getTag(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      setTags(data);
    }
  }, [data]);

  const options = tags.map((tag) => ({
    id: tag.id as string,
    label: tag.name as string,
    value: tag.name as string,
  }));

  return { options, isLoading };
};

export default useTags;
