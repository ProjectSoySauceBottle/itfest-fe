"use client";
import FadeIn from "@/components/Animation/FadeInAnimation";
import { Carousel } from "@mantine/carousel";
import React from "react";

export default function AllMenus({ searchType = null }) {
  const data = [
    {
      name: "Espresso",
      price: "20000",
      type: "coffee",
      image_url: "/assets/images/menu/Espresso.jpg",
    },
    {
      name: "Americano",
      price: "25000",
      type: "coffee",
      image_url: "/assets/images/menu/Americano.jpg",
    },
    {
      name: "Latte",
      price: "25000",
      type: "coffee",
      image_url: "/assets/images/menu/Latte.jpg",
    },
    {
      name: "Flat White",
      price: "25000",
      type: "coffee",
      image_url: "/assets/images/menu/Flat White.jpg",
    },
    {
      name: "Mocha",
      price: "30000",
      type: "coffee",
      image_url: "/assets/images/menu/Mocha.jpg",
    },
    {
      name: "Macchiato",
      price: "20000",
      type: "coffee",
      image_url: "/assets/images/menu/Macchiato.jpg",
    },

    // Non-Coffee
    {
      name: "Chocolate Milk",
      price: "22000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Chocolate Milk.jpg",
    },
    {
      name: "Strawberry Smoothie",
      price: "28000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Strawberry Smoothie.jpg",
    },
    {
      name: "Matcha Latte",
      price: "26000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Matcha Latte.jpg",
    },
    {
      name: "Green Tea",
      price: "18000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Green Tea.jpg",
    },
    {
      name: "Lemon Tea",
      price: "20000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Lemon Tea.jpg",
    },
    {
      name: "Chamomile Tea",
      price: "22000",
      type: "non-coffee",
      image_url: "/assets/images/menu/Chamomile Tea.jpg",
    },

    // Snack
    {
      name: "Croissant",
      price: "15000",
      type: "snack",
      image_url: "/assets/images/menu/Croissant.jpg",
    },
    {
      name: "Cheesecake",
      price: "30000",
      type: "snack",
      image_url: "/assets/images/menu/Cheesecake.jpg",
    },
    {
      name: "French Fries",
      price: "18000",
      type: "snack",
      image_url: "/assets/images/menu/French Fries.jpg",
    },
  ];

  const dataType = [
    ...new Set(
      data
        .filter((item) => {
          if (searchType) {
            return item.type === searchType;
          } else {
            return item;
          }
        })
        .map((item) => item.type)
    ),
  ];

  const Card = ({ type }) => {
    return (
      <div key={type} className="mt-20 w-full">
        <h2 className="text-xl font-bold mb-4 capitalize">{type}</h2>
        {data.filter((item) => item.type === type)?.length > 0 ? (
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data
              .filter((item) => item.type === type)
              .map((item, index) => (
                <FadeIn key={index} direction="right" delay={index * 100}>
                  <div key={index} className="bg-white rounded shadow p-4">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-52 object-cover object-center rounded mb-2"
                    />
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Rp{Number(item.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </FadeIn>
              ))}
          </div>
        ) : (
          <div>Menu Belum Tersedia</div>
        )}
        <Carousel className="sm:hidden">
          {data
            .filter((item) => item.type === type)
            .map((item, index) => (
              <Carousel.Slide key={index}>
                <div className="bg-white rounded shadow p-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-52 object-cover object-center rounded mb-2"
                  />
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    Rp{Number(item.price).toLocaleString("id-ID")}
                  </p>
                </div>
              </Carousel.Slide>
            ))}
        </Carousel>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {dataType.length > 0 ? (
        dataType.map((type, index) => <Card key={index} type={type} />)
      ) : (
        <div className="mt-20 w-full text-center bg-[#dcdcdc] py-4 rounded-md inset-shadow-sm">
          Menu <span className="font-bold">{searchType}</span> Tidak Tersedia
        </div>
      )}
    </div>
  );
}
