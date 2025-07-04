import Link from "next/link";
import React from "react";
import { CiInstagram } from "react-icons/ci";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-center space-y-5 py-8 px-[7%]">
      <div className="flex justify-center gap-5 ">
        <Link href="/">
          <FaInstagram />
        </Link>
        <Link href="/">
          <FaFacebook />
        </Link>
        <Link href="/">
          <FaTwitter />
        </Link>
        <Link href="/">
          <FaTiktok />
        </Link>
      </div>
      {/* Menu */}
      <div className="flex flex-wrap justify-center text-sm gap-5">
        <Link href="#home">Home</Link>
        <Link href="#about">Tentang Kami</Link>
        <Link href="#menu">Menu</Link>
        <Link href="#contact">Kontak</Link>
      </div>

      {/* Copyright */}
      <div className="text-xs">
        &copy; 2025{" "}
        <span className="font-bold text-background">Botol Kecap</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
