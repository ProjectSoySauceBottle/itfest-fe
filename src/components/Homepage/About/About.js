import FadeIn from "@/components/Animation/FadeInAnimation";
import React from "react";

export default function About() {
  return (
    <section id="about" className="min-h-screen pt-20 pb-6 px-[7%]">
      <FadeIn direction="bottom">
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          <span className="text-desc">Tentang</span> Kami
        </h2>
      </FadeIn>
      <div className="flex flex-wrap justify-center md:flex-nowrap mt-20 md:space-x-5">
        <div className="w-full md:max-w-1/2 relative">
          <FadeIn direction="left" delay={200}>
            <img
              src="/assets/images/about-us.jpg"
              alt="About Us"
              className="w-full h-80 md:h-96 object-cover object-center rounded-lg"
            />
          </FadeIn>
        </div>
        <article className="md:max-w-1/2 space-y-3 mt-4 md:mt-0">
          <FadeIn direction="right" delay={200}>
            <h3 className="text-2xl font-bold">Kenapa memilih kopi kami?</h3>
          </FadeIn>
          <FadeIn direction="right" delay={400}>
            <div className="space-y-3 text-desc">
              <p className="text-justify">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
                odio porro Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Maiores id dolor, quisquam facilis natus ex dolores
                nesciunt est laboriosam laborum maxime minima unde quod
                temporibus aliquam blanditiis vero eius, architecto veniam sed?
                fugit minus earum alias consequuntur veritatis assumenda at
                sapiente.
              </p>
              <p className="text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
                nisi laborum magni ipsam accusamus repellendus porro vero
                molestias recusandae et!
              </p>
            </div>
          </FadeIn>
        </article>
      </div>
    </section>
  );
}
