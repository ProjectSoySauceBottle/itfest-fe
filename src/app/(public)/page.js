import About from "@/components/Homepage/About/About";
import Contact from "@/components/Homepage/Contact/Contact";
import Hero from "@/components/Homepage/Hero/Hero";
import Menu from "@/components/Homepage/Menu/Menu";
import RecommendedMenu from "@/components/Homepage/RecommendedMenu/RecommendedMenu";

export default function Home() {
  return (
    <div className="bg-background text-primary font-poppins">
      <Hero />
      <About />
      <Menu />
      <RecommendedMenu />
      <Contact />
    </div>
  );
}
