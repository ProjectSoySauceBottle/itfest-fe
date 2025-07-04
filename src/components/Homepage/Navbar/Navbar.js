"use client";
import { useState } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdClose, MdMenu } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);

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
          <Link href="#home">
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
              onClick={() => (opened ? close() : open())}
              type="button"
              className="md:hidden text-white hover:text-primary focus:outline-none"
            >
              <MdMenu size="20" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="75%"
        className="md:hidden overflow-hidden z-50"
      >
        <Drawer.Body p="0" className="font-poppins font-normal p-3 space-y-1">
          <Link href="/#home">
            <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
              Home
            </div>
          </Link>
          <Link href="/#about">
            <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
              Tentang Kami
            </div>
          </Link>
          <Link href="/#menu">
            <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
              Menu
            </div>
          </Link>
          <Link href="/#contact">
            <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
              Kontak
            </div>
          </Link>
        </Drawer.Body>
      </Drawer>
    </nav>
  );
}
