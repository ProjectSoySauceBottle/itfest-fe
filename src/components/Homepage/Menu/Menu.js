import FadeIn from "@/components/Animation/FadeInAnimation";
import React from "react";

export default function Menu() {
  // const data = [
  //   {
  //     name: "Espresso",
  //     price: "20",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Espresso.jpg",
  //   },
  //   {
  //     name: "Americano",
  //     price: "25",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Americano.jpg",
  //   },
  //   {
  //     name: "Latte",
  //     price: "25",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Latte.jpg",
  //   },
  //   {
  //     name: "Flat White",
  //     price: "25",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Flat White.jpg",
  //   },
  //   {
  //     name: "Mocha",
  //     price: "30",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Mocha.jpg",
  //   },
  //   {
  //     name: "Macchiato",
  //     price: "20",
  //     type: "coffee",
  //     image_url: "/assets/images/menu/Macchiato.jpg",
  //   },
  // ];

  return (
    <section id="menu" className="min-h-screen pt-20 pb-6 px-[7%]">
      <FadeIn>
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          <span className="text-desc">Menu</span> Kami
        </h2>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
        <p className="max-w-[30rem] text-desc text-center text-sm mx-auto mt-4 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
          incidunt, impedit obcaecati placeat officiis. Lorem, ipsum. Lorem
          ipsum
        </p>
      </FadeIn>

      <div className="menu-section flex flex-wrap justify-center gap-5 mt-10">
        <FadeIn delay={400}>
          <div className="group relative flex flex-col w-64 h-96 text-background justify-end shadow items-center rounded-md overflow-hidden space-y-2">
            <img
              src="/assets/images/coffee.jpg"
              alt="Menu Coffee"
              className="absolute top-0 left-0 group-hover:scale-150 transition duration-300 w-full h-full object-cover -z-10"
            />
            <h3 className="text-center -translate-y-30 group-hover:translate-y-0 transition duration-300">
              Coffee
            </h3>
            <a
              href="/menu/coffee"
              target="_blank"
              className="cursor-pointer text-sm active:underline translate-y-10 group-hover:translate-y-0 transition duration-300 mb-2 hover:underline"
            >
              Lihat Semua
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={500}>
          <div className="group relative flex flex-col w-64 h-96 text-background justify-end shadow items-center rounded-md overflow-hidden space-y-2">
            <img
              src="/assets/images/tea.jpg"
              alt="Menu Coffee"
              className="absolute top-0 left-0 group-hover:scale-150 transition duration-300 w-full h-full object-cover -z-10"
            />
            <h3 className="text-center -translate-y-30 group-hover:translate-y-0 transition duration-300">
              Non-Coffee
            </h3>
            <a
              href="/menu/tea"
              target="_blank"
              className="cursor-pointer text-sm active:underline translate-y-10 group-hover:translate-y-0 transition duration-300 mb-2 hover:underline"
            >
              Lihat Semua
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <div className="group relative flex flex-col w-64 h-96 text-background justify-end shadow items-center rounded-md overflow-hidden space-y-2">
            <img
              src="/assets/images/croissant.jpg"
              alt="Menu Coffee"
              className="absolute top-0 left-0 group-hover:scale-150 transition duration-300 w-full h-full object-cover -z-10"
            />
            <h3 className="text-center -translate-y-30 group-hover:translate-y-0 transition duration-300">
              Snack
            </h3>
            <a
              href="/menu/snack"
              target="_blank"
              className="cursor-pointer text-sm active:underline translate-y-10 group-hover:translate-y-0 transition duration-300 mb-2 hover:underline"
            >
              Lihat Semua
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
