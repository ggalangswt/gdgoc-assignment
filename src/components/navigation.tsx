"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const getPageName = (path: string) => {
    const pathMap: { [key: string]: string } = {
      "/": "Home",
      "/shop": "Shop",
      "/about": "About",
      "/blog": "Blog",
      "/contact": "Contact",
      "/pages": "Pages",
    };
    return (
      pathMap[path] || path.slice(1).charAt(0).toUpperCase() + path.slice(2)
    );
  };

  if (pathname === "/") {
    return (
      <div className="bg-[#FAFAFA] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-bold text-[#252B42]">Home</h2>
        </div>
      </div>
    );
  }

  const currentPage = getPageName(pathname);

  return (
    <div className="bg-[#FAFAFA] py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm font-bold text-[#252B42] hover:opacity-80"
          >
            Home
          </Link>
          <ChevronRight size={16} className="text-[#BDBDBD]" />
          <span className="text-sm font-bold text-[#BDBDBD]">
            {currentPage}
          </span>
        </div>
      </div>
    </div>
  );
}
