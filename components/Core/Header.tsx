import Image from "next/image";
import React from "react";
// SVGs as React components (SVGR)
import SearchIcon from "@/components/icons/Search.svg?component";
import BagIcon from "@/components/icons/Bag.svg?component";
import MenuIcon from "@/components/icons/Menu.svg?component";
import { InfoCard } from "../Main";

// Minimal header: only apply a linear gradient border (your specified stops) and keep original structure.
// Stops: 11% rgba(255,255,255,0.14), 50% rgba(255,255,255,0), 100% rgba(255,255,255,0.15)
// Implemented via border-image so Tailwind bg utility (bg-white/5) still controls fill.
const Header = () => {
  return (
    <header
      className="fixed z-50 top-[44px] left-0 right-0 w-[calc(100%-88px)] mx-auto h-[80px] shadow-[0px_18px_22px_-6px_rgba(0,0,0,0.25)]
  "
    >
      <InfoCard
        className="backdrop-blur-[110.4px]
  !rounded-3xl h-full"
      >
        <div className="absolute inset-0 flex items-center justify-between px-6">
          {/* logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={48} height={48} />
            <span className="text-white text-[28px] font-black select-none">
              Planto.
            </span>
          </div>
          <nav className="md:flex hidden gap-6 text-xl font-medium">
            <a
              href="#"
              className="text-white/80 hover:text-white hover:scale-105 transition duration-300 ease-in-out"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white hover:scale-105 transition duration-300 ease-in-out"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white hover:scale-105 transition duration-300 ease-in-out"
            >
              Contact
            </a>
          </nav>
          <ul className="flex items-center gap-6 leading-[1]">
            {/* Icons: Use text color control; base semi-transparent, hover white */}
            <li className="md:block hidden h-[26px] w-[26px] content-center">
              <button
                aria-label="Search"
                className="h-full w-full cursor-pointer text-white/80 hover:text-white transition duration-300 ease-in-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <SearchIcon className="h-[26px] w-[26px] drop-shadow-[0px_18px_22px_-6px_rgba(0,0,0,0.25)]" />
              </button>
            </li>
            <li className="md:block hidden h-[26px] w-[26px] content-center">
              <button
                aria-label="Cart"
                className="h-full w-full cursor-pointer text-white/80 hover:text-white transition duration-300 ease-in-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <BagIcon className="h-[26px] w-[26px] drop-shadow-[0px_18px_22px_-6px_rgba(0,0,0,0.25)]" />
              </button>
            </li>
            <li className="h-[26px] w-[26px] content-center">
              <button
                aria-label="Menu"
                className="h-full w-full cursor-pointer text-white/80 hover:text-white transition duration-300 ease-in-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <MenuIcon className="h-[26px] w-[26px] drop-shadow-[0px_18px_22px_-6px_rgba(0,0,0,0.25)]" />
              </button>
            </li>
          </ul>
        </div>
      </InfoCard>
    </header>
  );
};

export default Header;
