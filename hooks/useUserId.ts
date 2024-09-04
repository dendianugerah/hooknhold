import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { getUserId } from "@/app/utils/action";

export default function useUserId() {
  const { data: session } = useSession();

  const { data: userId } = useQuery(
    ["userId", session?.user?.email],
    () => {
      if (session?.user?.email) {
        return getUserId(session.user.email);
      }
      return null;
    },
    {
      enabled: !!session?.user?.email,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  return userId as string;
}