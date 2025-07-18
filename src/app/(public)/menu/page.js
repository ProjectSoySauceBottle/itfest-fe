import AllMenus from "@/components/Homepage/Menu/AllMenus";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default async function Menu({ searchParams }) {
  const { s: searchType } = await searchParams;

  return (
    <section className="min-h-screen bg-background text-primary font-poppins px-[7%] py-20">
      <h1 className="font-bold text-2xl md:text-4xl text-center">Menu</h1>
      <AllMenus searchType={searchType} />
    </section>
  );
}
