"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={false}>{children}</SessionProvider>;
};

export default NextAuthProvider;
