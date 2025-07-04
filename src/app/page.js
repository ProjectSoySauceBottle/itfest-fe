import About from "@/components/Homepage/About/About";
import Contact from "@/components/Homepage/Contact/Contact";
import Footer from "@/components/Homepage/Footer/Footer";
import Hero from "@/components/Homepage/Hero/Hero";
import Menu from "@/components/Homepage/Menu/Menu";

export default function Home() {
  return (
    <div className="bg-background text-white font-poppins">
      <Hero />
      <About />
      <Menu />
      <Contact />
      <Footer />
    </div>
  );
}
