"use client";
import React from "react";
import { QueryClientProvider } from "react-query";

import queryClient from "@/lib/queryClient";
import SidebarSection from "@/components/container/mind/sidebar";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarSection />
      <main>{children}</main>
    </QueryClientProvider>
  );
};

export default Layout;
