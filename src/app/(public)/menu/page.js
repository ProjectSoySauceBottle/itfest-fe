import AllMenus from "@/components/Homepage/Menu/AllMenus";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default function Menu() {
  return (
    <section className="min-h-screen bg-background text-primary font-poppins px-[7%] py-20">
      <h1 className="font-bold text-2xl md:text-4xl text-center">Menu</h1>
      <AllMenus />
    </section>
  );
}
