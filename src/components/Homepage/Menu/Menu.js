import React from "react";

export default function Menu() {
  return (
    <section id="menu" className="min-h-screen pt-20 pb-6 px-[7%]">
      <h2 className="font-bold text-2xl md:text-4xl text-center">
        <span className="text-primary">Menu</span> Kami
      </h2>
      <p className="max-w-[30rem] text-center text-sm font-thin mx-auto mt-4 leading-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga incidunt,
        impedit obcaecati placeat officiis. Lorem, ipsum. Lorem ipsum
      </p>

      <div className="menu-section flex flex-wrap justify-center gap-20 mt-10">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Espresso.jpg"
            alt="Espresso"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Espresso -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Americano.jpg"
            alt="Americano"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Americano -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Latte.jpg"
            alt="Latte"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Latte -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Flat White.jpg"
            alt="Flat White"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Flat White -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Mocha.jpg"
            alt="Mocha"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Mocha -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <img
            src="/assets/images/menu/Macchiato.jpg"
            alt="Macchiato"
            className="w-48 object-cover object-center rounded-full"
          />
          <h3 className="mt-2">- Macchiato -</h3>
          <div className="text-sm font-thin mb-2">IDR 20K</div>
        </div>
      </div>
    </section>
  );
}
