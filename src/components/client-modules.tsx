"use client";

import dynamic from "next/dynamic";

const ReadingList = dynamic(() => import("@/modules/reading"), {
  ssr: false,
});

const BooksForYou = dynamic(() => import("@/modules/for-you"), {
  ssr: false,
});

const Product = dynamic(() => import("@/modules/product"), {
  ssr: false,
});

interface ClientModulesProps {
  productData?: {
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
  };
}

export default function ClientModules({ productData }: ClientModulesProps) {
  return (
    <>
      {productData && <Product {...productData} />}
      <ReadingList />
      <BooksForYou />
    </>
  );
}
