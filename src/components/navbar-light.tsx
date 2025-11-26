"use client";

import { Search, ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLight() {
  const pathname = usePathname();

  return (
    <nav className="bg-white h-[68px] w-full flex items-center justify-center">
      <div className="max-w-5xl mx-auto gap-10 flex items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl flex py-3 pr-20 font-semibold tracking-tight text-[#252B42]"
        >
          Bookstar
        </Link>
        <div className="flex py-0.5 pr-1 items-center gap-32">
          {/* Navigation Menu */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`text-sm font-semibold hover:text-[#2a2a2a] ${
                pathname === "/" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <Link
                href="/shop"
                className={`text-sm font-medium hover:text-[#2a2a2a] flex items-center gap-1 ${
                  pathname === "/shop" ? "text-[#2a2a2a]" : "text-[#737373]"
                }`}
              >
                Shop
                <ChevronDown size={14} className="mt-0.5" />
              </Link>
            </div>
            <Link
              href="/about"
              className={`text-sm font-medium hover:text-[#2a2a2a] ${
                pathname === "/about" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium hover:text-[#2a2a2a] ${
                pathname === "/blog" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium hover:text-[#2a2a2a] ${
                pathname === "/contact" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/pages"
              className={`text-sm font-medium hover:text-[#2a2a2a] ${
                pathname === "/pages" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Pages
            </Link>
          </div>

          {/* Right side - Auth & Icons */}
          <div className="flex">
            <Link
              href="/login"
              className="flex items-center p-4 gap-1 text-sm text-[#23A6F0] hover:opacity-80"
            >
              <User size={16} />
              <span className="font-medium">Login / Register</span>
            </Link>

            <div className="flex items-center">
              <button
                className="flex items-center p-3 gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
              <button
                className="flex items-center p-3 gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                aria-label="Cart"
              >
                <ShoppingCart size={16} />
                <span className="text-xs">1</span>
              </button>
              <button
                className="flex items-center p-3 gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                aria-label="Wishlist"
              >
                <Heart size={16} />
                <span className="text-xs">1</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
