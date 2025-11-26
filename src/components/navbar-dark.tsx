"use client";

import { Phone, X } from "lucide-react";
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";

interface NavbarDarkProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function NavbarDark({ isVisible, onToggle }: NavbarDarkProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-[#23856D] h-[58px] w-full flex items-center">
      <div className="w-full px-4 py-6 flex items-center gap-[30px] justify-center">
        {/* Left side - Contact Info */}
        <div className="flex items-center gap-2.5">
          <a
            href="tel:2255550118"
            className="flex items-center text-sm justify-center p-2.5 gap-1 hover:opacity-80 transition-opacity"
          >
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </a>
          <a
            href="mailto:michelle.rivera@example.com"
            className="flex items-center text-sm justify-center p-2.5 gap-1 hover:opacity-80 transition-opacity"
          >
            <BsEnvelope size={16} />
            <span>michelle.rivera@example.com</span>
          </a>
        </div>

        {/* Center - Promotional Text */}
        <div className="flex items-center font-medium text-sm p-2.5">
          Follow Us and get a chance to win 80% off
        </div>

        {/* Right side - Social Media */}
        <div className="flex p-2.5 items-center text-sm gap-2.5">
          <span className="hidden lg:inline">Follow Us :</span>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="YouTube"
            >
              <FaYoutube size={16} />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="#"
              className="hover:opacity-80 transition-opacity"
              aria-label="Twitter"
            >
              <FaTwitter size={16} />
            </a>
          </div>
          <button
            onClick={onToggle}
            className="ml-4 hover:opacity-80 transition-opacity"
            aria-label="Close navbar"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
