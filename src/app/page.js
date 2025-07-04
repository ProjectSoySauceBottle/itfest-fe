import About from "@/components/Homepage/About/about";
import Hero from "@/components/Homepage/Hero/Hero";

export default function Home() {
  return (
    <div className="bg-background text-white font-poppins">
      <Hero />
      <About />
    </div>
  );
}
