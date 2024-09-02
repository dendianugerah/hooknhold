"use client";
import React, { createContext, useState } from "react";
import { QueryClientProvider } from "react-query";

import queryClient from "@/lib/queryClient";
import useDebounce from "@/hooks/useDebounce";
import SidebarSection from "@/components/container/mind/sidebar";
import HeaderSection from "@/components/container/mind/header";
interface LayoutProps {
  children: React.ReactNode;
}

export const SearchContext = createContext({
  search: "",
  setSearch: (search: string) => {},
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ search: debounceSearch, setSearch }}>
      <div className="flex flex-col min-h-screen">
          <HeaderSection isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <div className="flex flex-1 relative">
            <SidebarSection isSidebarOpen={isSidebarOpen} />
            <main className="flex-1 lg:ml-[270px] xl:ml-[350px]">{children}</main>
          </div>
        </div>
      </SearchContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
