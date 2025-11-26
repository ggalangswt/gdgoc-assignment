"use client";

import { useState } from "react";
import NavbarDark from "@/components/navbar-dark";
import NavbarLight from "@/components/navbar-light";
import Navigation from "@/components/navigation";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarDarkVisible, setIsNavbarDarkVisible] = useState(true);

  const handleToggleNavbarDark = () => {
    setIsNavbarDarkVisible(!isNavbarDarkVisible);
  };

  // Calculate padding based on navbar visibility
  const topPadding = isNavbarDarkVisible ? "pt-[116px]" : "pt-[58px]";

  return (
    <>
      <div className="w-full fixed top-0 left-0 right-0 z-50">
        <div className="relative flex flex-col">
          <NavbarDark
            isVisible={isNavbarDarkVisible}
            onToggle={handleToggleNavbarDark}
          />
          <NavbarLight />
        </div>
      </div>
      <div className={topPadding}>
        <Navigation />
        {children}
      </div>
    </>
  );
}
