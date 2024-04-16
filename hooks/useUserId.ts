import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserId } from "@/app/utils/action";

export default function useUserId() {
  const { data: session } = useSession();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      if (session?.user?.email) {
        const id = await getUserId(session.user.email);
        setUserId(id);
      }
    };

    fetchUserId();
  }, [session]);

  return userId;
}
