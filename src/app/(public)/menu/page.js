import AllMenus from "@/components/Homepage/Menu/AllMenus";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default async function Menu({ searchParams }) {
  const { s: searchType } = await searchParams;

  const data = [
    {
      id: 1,
      name: "Espresso",
      price: 20000,
      type: "coffee",
      image_url: "/assets/images/menu/Espresso.jpg",
    },
    {
      id: 2,
      name: "Americano",
      price: 25000,
      type: "coffee",
      image_url: "/assets/images/menu/Americano.jpg",
    },
    {
      id: 3,
      name: "Latte",
      price: 25000,
      type: "coffee",
      image_url: "/assets/images/menu/Latte.jpg",
    },
    {
      id: 4,
      name: "Flat White",
      price: 25000,
      type: "coffee",
      image_url: "/assets/images/menu/Flat White.jpg",
    },
    {
      id: 5,
      name: "Mocha",
      price: 30000,
      type: "coffee",
      image_url: "/assets/images/menu/Mocha.jpg",
    },
    {
      id: 6,
      name: "Macchiato",
      price: 20000,
      type: "coffee",
      image_url: "/assets/images/menu/Macchiato.jpg",
    },

    // Non-Coffee
    {
      id: 7,
      name: "Chocolate Milk",
      price: 22000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Chocolate Milk.jpg",
    },
    {
      id: 8,
      name: "Strawberry Smoothie",
      price: 28000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Strawberry Smoothie.jpg",
    },
    {
      id: 9,
      name: "Matcha Latte",
      price: 26000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Matcha Latte.jpg",
    },
    {
      id: 10,
      name: "Green Tea",
      price: 18000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Green Tea.jpg",
    },
    {
      id: 11,
      name: "Lemon Tea",
      price: 20000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Lemon Tea.jpg",
    },
    {
      id: 12,
      name: "Chamomile Tea",
      price: 22000,
      type: "non-coffee",
      image_url: "/assets/images/menu/Chamomile Tea.jpg",
    },

    // Snack
    {
      id: 13,
      name: "Croissant",
      price: 15000,
      type: "snack",
      image_url: "/assets/images/menu/Croissant.jpg",
    },
    {
      id: 14,
      name: "Cheesecake",
      price: 30000,
      type: "snack",
      image_url: "/assets/images/menu/Cheesecake.jpg",
    },
    {
      id: 15,
      name: "French Fries",
      price: 18000,
      type: "snack",
      image_url: "/assets/images/menu/French Fries.jpg",
    },
  ];

  return (
    <section className="min-h-screen bg-background text-primary font-poppins px-[7%] py-20">
      <h1 className="font-bold text-2xl md:text-4xl text-center">Menu</h1>
      <AllMenus data={data} searchType={searchType} />
    </section>
  );
}
