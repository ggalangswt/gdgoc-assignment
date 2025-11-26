"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface BookCardProps {
  id: string;
  title: string;
  coverImage: string;
  category?: string;
  originalPrice: string;
  discountedPrice: string;
  onClick?: () => void;
}

export default function BookCard({
  id,
  title,
  coverImage,
  category,
  originalPrice,
  discountedPrice,
  onClick,
}: BookCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/shop?bookId=${id}`);
    }
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      {/* Book Cover */}
      <div className="relative aspect-4/5 bg-neutral-200 overflow-hidden">
        <Image
          src={coverImage || "/book-placeholder.jpg"}
          alt={title}
          fill
          className="object-contain scale-80 group-hover:scale-100 transition-transform duration-300"
        />
      </div>

      {/* Book Info */}
      <div className=" p-6 pb-9 bg-white">
        {/* Title */}
        <h3 className="font-semibold text-[#252B42] line-clamp-2 group-hover:text-[#23A6F0] transition-colors">
          {title}
        </h3>

        {/* Category */}
        {category && (
          <p className="text-sm font-semibold text-[#737373]">{category}</p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[#BDBDBD] line-through text-sm">
            {originalPrice}
          </span>
          <span className="text-[#40BB15] font-bold">{discountedPrice}</span>
        </div>
      </div>
    </div>
  );
}
