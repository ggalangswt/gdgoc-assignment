"use client";

import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarLight() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white w-screen">
      <div className="lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-tight text-[#252B42] z-20"
          >
            Bookstar
          </Link>

          <div className="hidden md:flex items-center gap-32">
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

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#252B42] p-2 z-20"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 pt-2 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-semibold hover:bg-gray-50 rounded ${
                pathname === "/" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded ${
                pathname === "/shop" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded ${
                pathname === "/about" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              About
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded ${
                pathname === "/blog" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded ${
                pathname === "/contact" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Contact
            </Link>
            <Link
              href="/pages"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium hover:bg-gray-50 rounded ${
                pathname === "/pages" ? "text-[#2a2a2a]" : "text-[#737373]"
              }`}
            >
              Pages
            </Link>

            <div className="border-t border-gray-200 pt-3 mt-3">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center px-4 py-2 gap-2 text-sm text-[#23A6F0] hover:bg-gray-50 rounded"
              >
                <User size={16} />
                <span className="font-medium">Login / Register</span>
              </Link>

              <div className="flex items-center gap-4 px-4 py-2">
                <button
                  className="flex items-center gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
                <button
                  className="flex items-center gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                  aria-label="Cart"
                >
                  <ShoppingCart size={16} />
                  <span className="text-xs">1</span>
                </button>
                <button
                  className="flex items-center gap-1 text-sm text-[#23A6F0] hover:opacity-80"
                  aria-label="Wishlist"
                >
                  <Heart size={16} />
                  <span className="text-xs">1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
