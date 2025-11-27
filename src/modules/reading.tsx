"use client";

import BookCard from "@/components/card";
import BookCardSkeleton from "@/components/card-skeleton";
import { useWishlist } from "@/contexts/wishlist-context";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

interface ReadingListProps {
  title?: string;
}

export default function ReadingList({
  title = "Your Reading List",
}: ReadingListProps) {
  const { wishlist } = useWishlist();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    async function fetchWishlistBooks() {
      if (wishlist.length === 0) {
        setBooks([]);
        return;
      }

      setIsLoading(true);
      try {
        const fetchedBooks = await Promise.all(
          wishlist.map(async (bookId) => {
            try {
              const res = await fetch(
                `https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/${bookId}`
              );
              if (!res.ok) throw new Error("Failed to fetch book");
              const data = await res.json();
              console.log("Fetched book data:", data);
              return data.data || data;
            } catch (error) {
              console.error(`Error fetching book ${bookId}:`, error);
              return null;
            }
          })
        );

        const validBooks = fetchedBooks.filter(
          (book): book is Book => book !== null
        );
        console.log("Valid books:", validBooks);
        setBooks(validBooks);
      } catch (error) {
        console.error("Error fetching wishlist books:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWishlistBooks();
  }, [wishlist]);

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

    console.log(
      "Parsing price for book:",
      book.title,
      "priceNumber:",
      priceNumber
    );

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
    <>
      <style jsx global>{`
        .reading-list-swiper .swiper-pagination-bullet {
          background: #23a6f0 !important;
          opacity: 0.5;
        }

        .reading-list-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
      <div className="w-full bg-[#FAFAFA] py-12">
        <div className="max-w-6xl mx-auto px-10 lg:px-0">
          <h2 className="text-2xl max-w-5xl mx-auto font-bold text-[#252B42] border-b-2 border-[#ECECEC] pb-6">
            {title}
          </h2>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
              {[...Array(4)].map((_, index) => (
                <BookCardSkeleton key={index} />
              ))}
            </div>
          )}

          {!isLoading && books.length > 0 && (
            <div className="mt-6 relative">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-neutral-200 rounded-full hover:bg-neutral-300 hover:text-white transition-colors group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-neutral-200 rounded-full hover:bg-neutral-300 hover:text-white transition-colors group"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="px-16">
                <Swiper
                  modules={[Pagination]}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  pagination={{ clickable: true }}
                  spaceBetween={32}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                  className="reading-list-swiper pb-12"
                >
                  {books.map((book) => {
                    const prices = parsePrice(book);

                    return (
                      <SwiperSlide key={book._id}>
                        <BookCard
                          id={book._id}
                          title={book.title}
                          coverImage={book.cover_image}
                          category={book.category?.name}
                          originalPrice={prices.original}
                          discountedPrice={prices.discounted}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          )}

          {!isLoading && books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#737373]">
                No books in your reading list yet. Add some books to get
                started!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
