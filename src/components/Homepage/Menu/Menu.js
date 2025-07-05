import FadeIn from "@/components/Animation/FadeInAnimation";
import React from "react";

export default function Menu() {
  const data = [
    {
      name: "Espresso",
      price: "20",
      image_url: "/assets/images/menu/Espresso.jpg",
    },
    {
      name: "Americano",
      price: "25",
      image_url: "/assets/images/menu/Americano.jpg",
    },
    {
      name: "Latte",
      price: "25",
      image_url: "/assets/images/menu/Latte.jpg",
    },
    {
      name: "Flat White",
      price: "25",
      image_url: "/assets/images/menu/Flat White.jpg",
    },
    {
      name: "Mocha",
      price: "30",
      image_url: "/assets/images/menu/Mocha.jpg",
    },
    {
      name: "Macchiato",
      price: "20",
      image_url: "/assets/images/menu/Macchiato.jpg",
    },
  ];

  return (
    <section id="menu" className="min-h-screen pt-20 pb-6 px-[7%]">
      <FadeIn>
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          <span className="text-primary">Menu</span> Kami
        </h2>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
        <p className="max-w-[30rem] text-center text-sm font-thin mx-auto mt-4 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          incidunt, impedit obcaecati placeat officiis. Lorem, ipsum. Lorem
          ipsum
        </p>
      </FadeIn>

      <div className="menu-section flex flex-wrap justify-center gap-20 mt-10">
        {data.map((item, index) => (
          <FadeIn key={index} delay={400 + index * 100}>
            <div className="flex flex-col items-center space-y-2">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-48 object-cover object-center rounded-full"
              />
              <h3 className="mt-2">-- {item.name} --</h3>
              <div className="text-sm font-thin mb-2">IDR {item.price}K</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
