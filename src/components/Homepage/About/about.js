import React from "react";

export default function About() {
  return (
    <section id="about" className="min-h-screen pt-20 pb-6 px-5 md:px-[7%]">
      <h2 className="font-bold text-2xl md:text-4xl text-center">
        <span className="text-primary">Tentang</span> Kami
      </h2>
      <div className="flex flex-wrap justify-center md:flex-nowrap mt-10 md:space-x-5">
        <div className="w-full md:max-w-1/2 relative">
          <div className="absolute h-full top-0 left-0 w-1/4 bg-gradient-to-tr from-background "></div>
          <img
            src="/assets/images/Coffee3.jpg"
            alt="About Us"
            className="w-full h-80 object-cover object-center rounded-md"
          />
        </div>
        <article className="md:max-w-1/2 space-y-3 mt-4 md:mt-0">
          <h3 className="text-2xl font-bold">Kenapa memilih kopi kami?</h3>
          <p className="font-thin text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic odio
            porro Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores id dolor, quisquam facilis natus ex dolores nesciunt est
            laboriosam laborum maxime minima unde quod temporibus aliquam
            blanditiis vero eius, architecto veniam sed? fugit minus earum alias
            consequuntur veritatis assumenda at sapiente.
          </p>
          <p className="font-thin text-justify">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto nisi
            laborum magni ipsam accusamus repellendus porro vero molestias
            recusandae et!
          </p>
        </article>
      </div>
    </section>
  );
}
