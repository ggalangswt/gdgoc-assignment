import { Suspense } from "react";
import ProductSkeleton from "@/components/product-skeleton";
import ClientModules from "@/components/client-modules";

async function getBookById(bookId: string) {
  try {
    const res = await fetch(
      `https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/${bookId}`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }

    const data = await res.json();
    return data.data || data;
  } catch {
    return null;
  }
}

async function getRandomBook() {
  try {
    const res = await fetch(
      "https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/random_book",
      {
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }

    const data = await res.json();

    if (data && data.data) {
      return data.data;
    } else if (data) {
      return data;
    }

    throw new Error("No data in response");
  } catch {
    return {
      title: "Beyond the Stars",
      price: 1139.33,
      genre: "Self Improvement",
      synopsis:
        "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie.",
      pages: 328,
      publisher: "Noir House Books",
      isbn: "978-1-234567-90-6",
      year: "2024",
      image: "/book-placeholder.jpg",
    };
  }
}

async function ProductContent({ bookId }: { bookId?: string }): Promise<{
  bookId: string;
  title: string;
  price: number;
  availability: "In Stock" | "Out of Stock";
  tags: string[];
  description: string;
  pages: number;
  publisher: string;
  isbn: string;
  published: string;
  author?: string;
  buyLink?: string;
  images: string[];
} | null> {
  let bookData;
  if (bookId) {
    bookData = await getBookById(bookId);
  } else {
    bookData = await getRandomBook();
  }

  if (!bookData || typeof bookData !== "object") {
    return null;
  }

  const priceString = bookData?.details?.price || "Rp 0";
  const priceNumber = parseFloat(
    priceString.replace(/[^\d.-]/g, "").replace(/\./g, "")
  );

  const pagesString = bookData?.details?.total_pages || "0 pages";
  const pagesNumber = parseInt(pagesString.replace(/\D/g, "")) || 0;

  const publishedDate = bookData?.details?.published_date || "";

  const buyLink = bookData?.buy_links?.[0]?.url || undefined;

  const productData = {
    bookId: bookData?._id || "unknown",
    title: bookData?.title || "Unknown Title",
    price: priceNumber,
    availability: "In Stock" as const,
    tags: bookData?.category?.name ? [bookData.category.name] : ["General"],
    description: bookData?.summary || "No description available",
    pages: pagesNumber,
    publisher: bookData?.publisher || "Unknown Publisher",
    isbn: bookData?.details?.isbn || "N/A",
    published: publishedDate || "Unknown",
    author: bookData?.author?.name || undefined,
    buyLink: buyLink,
    images: bookData?.cover_image
      ? [
          bookData.cover_image,
          bookData.cover_image,
          bookData.cover_image,
          bookData.cover_image,
        ]
      : ["/book-placeholder.jpg"],
  };

  return productData;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ bookId?: string }>;
}) {
  const params = await searchParams;
  const bookId = params.bookId;
  const productData = await ProductContent({ bookId });

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ProductSkeleton />}>
        <ClientModules productData={productData || undefined} />
      </Suspense>
    </div>
  );
}
