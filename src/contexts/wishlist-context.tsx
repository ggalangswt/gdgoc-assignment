"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error("Failed to parse wishlist:", error);
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (bookId: string) => {
    setWishlist((prev) => {
      if (!prev.includes(bookId)) {
        return [...prev, bookId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist((prev) => prev.filter((id) => id !== bookId));
  };

  const isInWishlist = (bookId: string) => {
    return wishlist.includes(bookId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
