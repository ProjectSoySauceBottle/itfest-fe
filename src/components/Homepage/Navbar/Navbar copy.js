"use client";
import { useState } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdClose, MdMenu } from "react-icons/md";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 fixed w-full z-50 border-b border-b-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="text-white font-extrabold text-xl italic">
                SSB<span className="text-amber-400">Cafe.</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/">
              <div className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium">
                Home
              </div>
            </Link>
            <Link href="/tentang-kami">
              <div className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium">
                Tentang Kami
              </div>
            </Link>
            <Link href="/menu">
              <div className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium">
                Menu
              </div>
            </Link>
            <Link href="/kontak">
              <div className="text-white hover:text-amber-400 px-3 py-2 text-sm font-medium">
                Kontak
              </div>
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Icon */}
            <button
              aria-label="Search"
              className="text-white hover:text-amber-400 focus:outline-none"
            >
              <CiSearch size="24" />
            </button>

            {/* Cart Icon */}
            <button
              aria-label="Shopping Cart"
              className="text-white hover:text-amber-400 focus:outline-none"
            >
              <CiShoppingCart size="24" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <div className="flex space-x-4 px-3 py-2">
              <button
                aria-label="Search"
                className="text-white hover:text-amber-400 focus:outline-none"
              >
                <CiSearch size="20" />
              </button>

              <button
                aria-label="Shopping Cart"
                className="text-white hover:text-amber-400 focus:outline-none"
              >
                <CiShoppingCart size="20" />
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              className="text-white hover:text-amber-400 focus:outline-none"
            >
              {isMobileMenuOpen ? <MdClose size="20" /> : <MdMenu size="20" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-400 hover:text-black">
                Home
              </div>
            </Link>
            <Link href="/tentang-kami">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-400 hover:text-black">
                Tentang Kami
              </div>
            </Link>
            <Link href="/menu">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-400 hover:text-black">
                Menu
              </div>
            </Link>
            <Link href="/kontak">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-amber-400 hover:text-black">
                Kontak
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
