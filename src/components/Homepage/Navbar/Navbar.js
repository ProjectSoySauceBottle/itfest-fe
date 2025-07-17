"use client";
import { useState } from "react";
import Link from "next/link";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdClose, MdMenu } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  const handleRoute = (path) => {
    router.push(path);
    setTimeout(() => close(), 200);
  };
  return (
    <header>
      <nav className="bg-background/80 text-primary font-poppins fixed w-full z-50">
        <div className="flex justify-between py-[1rem] items-center px-[7%]">
          {/* Logo */}
          <Link href="/">
            <div className="font-extrabold text-xl italic">
              SSB<span className="text-desc">Cafe.</span>
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
                className="hover:text-foreground focus:outline-none"
              >
                <CiSearch size="20" />
              </button>

              <button
                aria-label="Shopping Cart"
                className="hover:text-foreground focus:outline-none"
              >
                <CiShoppingCart size="20" />
              </button>
              <button
                onClick={() => (opened ? close() : open())}
                type="button"
                className="md:hidden hover:text-foreground focus:outline-none"
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
          offset={5}
          radius={10}
          closeButtonProps={{
            icon: <MdMenu size={20} stroke={1.5} />,
          }}
          className="md:hidden overflow-hidden z-50"
        >
          <Drawer.Body p="0" className="font-poppins font-normal p-3 space-y-1">
            <button
              onClick={() => handleRoute("/#home")}
              className="block w-full text-left"
            >
              <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
                Home
              </div>
            </button>
            <button
              onClick={() => handleRoute("/#about")}
              className="block w-full text-left"
            >
              <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
                Tentang Kami
              </div>
            </button>
            <button
              onClick={() => handleRoute("/#menu")}
              className="block w-full text-left"
            >
              <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
                Menu
              </div>
            </button>
            <button
              onClick={() => handleRoute("/#contact")}
              className="block w-full text-left"
            >
              <div className="navbar-menu-link font-normal p-3 rounded-md text-base">
                Kontak
              </div>
            </button>
          </Drawer.Body>
        </Drawer>
      </nav>
    </header>
  );
}
