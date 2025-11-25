"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface ProductProps {
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
}

export default function Product({
  title,
  price,
  availability,
  tags,
  description,
  pages,
  publisher,
  isbn,
  published,
  author,
  buyLink,
  images,
}: ProductProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 150;
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  const displayDescription =
    shouldTruncate && !isDescriptionExpanded
      ? description.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
      : description;

  return (
    <>
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
        }
      `}</style>
      <div className=" mx-auto pb-8 bg-[#FAFAFA]">
        <div className="grid grid-cols-1 max-w-5xl mx-auto lg:grid-cols-2 gap-8">
          {/* Left Section - Image Carousel */}
          <div className="space-y-4">
            {/* Main Image Swiper */}
            <div className="relative bg-neutral-300 overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
                className="aspect-square"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="w-full h-full flex items-center justify-center p-8">
                      <Image
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        width={500}
                        height={500}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress
              className="thumbs-swiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-square bg-neutral-300 cursor-pointer overflow-hidden border-2 border-transparent hover:border-[#23A6F0] transition-colors">
                    <Image
                      src={image}
                      alt={`${title} - Thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Section - Product Details */}
          <div className="space-y-2">
            {/* Tags */}
            <div className="flex gap-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 bg-[#E0E0E0] text-black text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="pt-4 text-3xl font-semibold text-[#252B42]">
              {title}
            </h1>

            {/* Price */}
            <div className="text-xl font-semibold text-[#252B42]">
              Rp
              {price.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[#737373]">
                Availability :
              </span>
              <span
                className={`text-sm font-semibold ${
                  availability === "In Stock"
                    ? "text-[#23A6F0]"
                    : "text-red-500"
                }`}
              >
                {availability}
              </span>
            </div>

            {/* Description */}
            <div className="pt-2">
              <p className="text-[#858585] leading-6">{displayDescription}</p>
              {shouldTruncate && (
                <button
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                  className="text-[#23A6F0] hover:underline text-sm font-medium"
                >
                  {isDescriptionExpanded ? "See Less" : "See More"}
                </button>
              )}
            </div>

            {/* Additional Details */}
            <div className="space-y-2 text-sm text-[#737373] pt-2">
              {author && (
                <div className="flex gap-2">
                  <span className="font-semibold">Author:</span>
                  <span>{author}</span>
                </div>
              )}
              <div className="flex gap-2">
                <span className="font-semibold">Pages:</span>
                <span>{pages} pages</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Publisher:</span>
                <span>{publisher}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">ISBN:</span>
                <span>{isbn}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Published:</span>
                <span>{published}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-10">
              <button
                onClick={() =>
                  buyLink &&
                  window.open(buyLink, "_blank", "noopener,noreferrer")
                }
                className="px-3.5 py-2.5 bg-[#007AFF] text-white font-semibold rounded-2xl hover:bg-[#005FCC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!buyLink}
              >
                Buy Now
              </button>
              <button
                className="flex p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] hover:text-white transition-colors group"
                aria-label="Add to wishlist"
              >
                <Heart
                  size={20}
                  className="text-[#252B42] group-hover:text-white"
                />
              </button>
              <button
                className="flex p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] hover:text-white transition-colors group"
                aria-label="Add to cart"
              >
                <ShoppingCart
                  size={20}
                  className="text-[#252B42] group-hover:text-white"
                />
              </button>
              <button
                className="flex p-2.5 bg-[#DBECFF] rounded-full hover:bg-[#AACBFF] hover:text-white transition-colors group"
                aria-label="Quick view"
              >
                <Eye
                  size={20}
                  className="text-[#252B42] group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
