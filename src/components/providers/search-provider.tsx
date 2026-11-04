"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { SearchOverlay } from "@/components/search/search-overlay";

type SearchProviderValue = {
  openSearch: () => void;
  closeSearch: () => void;
  isOpen: boolean;
};

const SearchContext = createContext<SearchProviderValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ openSearch, closeSearch, isOpen }),
    [openSearch, closeSearch, isOpen],
  );

  return (
    <SearchContext.Provider value={value}>
      {children}
      <SearchOverlay />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}
