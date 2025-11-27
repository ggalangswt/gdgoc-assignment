"use client";

import BookCard from "@/components/card";
import BookCardSkeleton from "@/components/card-skeleton";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  cover_image: string;
  category?: {
    name: string;
  };
  details?: {
    price: string;
  };
  price?: number;
}

export default function BooksForYou() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const booksPerPage = 8;

  useEffect(() => {
    async function fetchRandomBooks() {
      setIsLoading(true);
      try {
        const fetchPromises = Array(booksPerPage)
          .fill(null)
          .map(async () => {
            try {
              const res = await fetch(
                "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book"
              );
              if (!res.ok) throw new Error("Failed to fetch book");
              const data = await res.json();
              return data.data || data;
            } catch (error) {
              console.error("Error fetching random book:", error);
              return null;
            }
          });

        const fetchedBooks = await Promise.all(fetchPromises);
        const validBooks = fetchedBooks.filter(
          (book): book is Book => book !== null
        );
        setBooks(validBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRandomBooks();
  }, [currentPage]);

  // Parse price from API format
  const parsePrice = (book: Book): { original: string; discounted: string } => {
    let priceNumber = 0;

    if (book.details?.price) {
      const priceString = book.details.price;
      priceNumber = parseFloat(
        priceString.replace(/[^\d.-]/g, "").replace(/\./g, "")
      );
    } else if (book.price) {
      priceNumber =
        typeof book.price === "number"
          ? book.price
          : parseFloat(String(book.price));
    }

    const adjustedPrice = priceNumber;
    const originalPrice = adjustedPrice * 1.4;

    return {
      original: `Rp ${originalPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
      discounted: `Rp ${adjustedPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })}`,
    };
  };

  return (
    <div className="w-full bg-[#FAFAFA] py-12">
      <div className="max-w-5xl px-10 lg:px-0 mx-auto">
        <h2 className="text-2xl font-bold text-[#252B42] mb-6">
          Books For You
        </h2>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => {
              const prices = parsePrice(book);

              return (
                <BookCard
                  key={book._id}
                  id={book._id}
                  title={book.title}
                  coverImage={book.cover_image}
                  category={book.category?.name}
                  originalPrice={prices.original}
                  discountedPrice={prices.discounted}
                />
              );
            })}
          </div>
        )}

        {!isLoading && books.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#737373]">
              Failed to load books. Please try again later.
            </p>
          </div>
        )}

        {!isLoading && books.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-[#BDBDBD] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={20} className="text-[#252B42]" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const showPage =
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1);

              const showEllipsisBefore =
                page === currentPage - 2 && currentPage > 3;
              const showEllipsisAfter =
                page === currentPage + 2 && currentPage < totalPages - 2;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <span key={page} className="px-2 text-[#737373]">
                    ...
                  </span>
                );
              }

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-10 h-10 px-3 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#23A6F0] text-white"
                      : "text-[#252B42] hover:bg-[#F5F5F5] border border-[#BDBDBD]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-[#BDBDBD] hover:bg-[#F5F5F5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={20} className="text-[#252B42]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
