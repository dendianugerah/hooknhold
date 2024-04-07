"use client";
import SidebarSection from "@/components/container/mind/sidebar";
import NextAuthProvider from "@/components/container/provider";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <NextAuthProvider>
      <div>
        <SidebarSection />
        <div>{children}</div>
      </div>
    </NextAuthProvider>
  );
};

export default Layout;
