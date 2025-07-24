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
                Kami hadir untuk menghadirkan pengalaman ngopi yang berbeda.
                Dari pemilihan biji kopi terbaik hingga cara penyajian yang
                penuh perhatian, setiap detail kami pikirkan untuk memberikan
                rasa yang tak terlupakan. Café ini bukan hanya tempat menikmati
                minuman, tapi juga ruang untuk berbagi cerita dan menciptakan
                kenangan.
              </p>
              <p className="text-justify">
                Dengan interior yang hangat dan suasana yang tenang, kamu bisa
                bekerja, bersantai, atau sekadar menikmati waktu luang. Tim kami
                ramah dan siap melayani dengan sepenuh hati. Setiap kunjunganmu
                adalah bagian dari perjalanan kami untuk terus menjadi lebih
                baik.
              </p>
            </div>
          </FadeIn>
        </article>
      </div>
    </section>
  );
}
