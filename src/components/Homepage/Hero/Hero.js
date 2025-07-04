import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex relative items-center bg-[url('/assets/images/hero-section.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="block absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-background"></div>
      <div className="py-6 px-[7%] max-w-xs sm:max-w-sm md:max-w-xl space-y-4 md:space-y-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-shadow-lg text-shadow-black/50 leading-8 md:leading-14">
          Mari Nikmati Secangkir <span className="text-primary">Kopi</span>
        </h1>
        <p className="font-thin text-xs md:text-base text-shadow-lg text-shadow-black/50 mix-blend-difference">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur,
          odio?
        </p>
        <Link
          href="#"
          className="inline-block text-sm md:text-base py-4 px-8 md:py-4 md:px-10 bg-primary text-white rounded-lg"
        >
          Beli Sekarang
        </Link>
      </div>
    </section>
  );
}
