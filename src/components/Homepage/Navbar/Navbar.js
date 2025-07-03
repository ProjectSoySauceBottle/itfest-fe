"use client";
import { useState } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdClose, MdMenu } from "react-icons/md";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 font-poppins fixed w-full z-50 border-b-2 border-b-primary">
      <div className="flex justify-between py-[1rem] items-center px-[7%]">
        {/* Logo */}
        <Link href="/">
          <div className="text-white font-extrabold text-xl italic">
            SSB<span className="text-primary">Cafe.</span>
          </div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-5 items-center">
          <Link href="#">
            <div className="navbar-menu-link">Home</div>
          </Link>
          <Link href="#about">
            <div className="navbar-menu-link">Tentang Kami</div>
          </Link>
          <Link href="#menu">
            <div className="navbar-menu-link">Menu</div>
          </Link>
          <Link href="#contact">
            <div className="navbar-menu-link">Kontak</div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center">
          <div className="flex space-x-3">
            <button
              aria-label="Search"
              className="text-white hover:text-primary focus:outline-none"
            >
              <CiSearch size="20" />
            </button>

            <button
              aria-label="Shopping Cart"
              className="text-white hover:text-primary focus:outline-none"
            >
              <CiShoppingCart size="20" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden text-white hover:text-primary focus:outline-none"
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
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-black">
                Home
              </div>
            </Link>
            <Link href="/tentang-kami">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-black">
                Tentang Kami
              </div>
            </Link>
            <Link href="/menu">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-black">
                Menu
              </div>
            </Link>
            <Link href="/kontak">
              <div className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary hover:text-black">
                Kontak
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
