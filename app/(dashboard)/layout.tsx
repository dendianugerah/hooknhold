"use client";
import React, { createContext, useMemo, useState } from "react";
import { QueryClientProvider } from "react-query";

import queryClient from "@/lib/queryClient";
import useDebounce from "@/hooks/useDebounce";
import useUserId from "@/hooks/useUserId";
import { UserContext, SearchContext } from "@/context";
import SidebarSection from "@/components/container/mind/sidebar";
import HeaderSection from "@/components/container/mind/header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const debounceSearch = useDebounce(search, 300);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextWrapper>
        <SearchContext.Provider value={{ search: debounceSearch, setSearch }}>
          <div className="flex flex-col min-h-screen">
            <HeaderSection isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex flex-1 relative">
              <SidebarSection isSidebarOpen={isSidebarOpen}/>
              <main className="flex-1 lg:ml-[270px] xl:ml-[350px]">{children}</main>
            </div>
          </div>
        </SearchContext.Provider>
      </UserContextWrapper>
    </QueryClientProvider>
  );
};

const UserContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userId = useUserId();
  const userContextValue = useMemo(() => ({ userId }), [userId]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export default Layout;
