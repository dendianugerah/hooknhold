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

export const AccordionContext = createContext({
  openItems: {} as Record<string, boolean>,
  setOpenItems: (items: React.SetStateAction<Record<string, boolean>>) => {},
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const debounceSearch = useDebounce(search, 300);

  return (
    <QueryClientProvider client={queryClient}>
      <SearchContext.Provider value={{ search: debounceSearch, setSearch }}>
        <AccordionContext.Provider value={{ openItems, setOpenItems }}>
          <div className="flex flex-col min-h-screen">
            <HeaderSection
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <div>{children}</div>
          </div>
        </AccordionContext.Provider>
      </SearchContext.Provider>
    </QueryClientProvider>
  );
};

export default Layout;
