'use client';

import { createContext, useContext, useState, type ReactNode } from "react";

interface SearchContextType {
  isSearchFocused: boolean;
  setIsSearchFocused: (value: boolean) => void;
}

const SearchContext = createContext<SearchContextType>({
  isSearchFocused: false,
  setIsSearchFocused: () => { },
});

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <SearchContext.Provider value={{ isSearchFocused, setIsSearchFocused }}>
      {children}
    </SearchContext.Provider>
  );
};
