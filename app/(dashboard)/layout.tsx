"use client";
import React, { createContext, useState } from "react";
import { QueryClientProvider } from "react-query";

import queryClient from "@/lib/queryClient";
import useDebounce from "@/hooks/useDebounce";
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
          <HeaderSection
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <div>{children}</div>
        </div>
      </SearchContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
