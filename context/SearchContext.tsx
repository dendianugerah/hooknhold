import { createContext } from "react";

interface SearchContextType  {
    search: string;
    setSearch: (search: string) => void;
}

export const SearchContext = createContext<SearchContextType>({
    search: '',
    setSearch: () => {},
})