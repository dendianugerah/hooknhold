"use client";
import React, { createContext, useState } from "react";
import { QueryClientProvider } from "react-query";

import queryClient from "@/lib/queryClient";
import SidebarSection from "@/components/container/mind/sidebar";
import useDebounce from "@/hooks/useDebounce";
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

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ search: debounceSearch, setSearch }}>
        <SidebarSection />
        <main>{children}</main>
      </SearchContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
