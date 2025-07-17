import Footer from "@/components/Homepage/Footer/Footer";
import Navbar from "@/components/Homepage/Navbar/Navbar";

export const metadata = {
  title: {
    default: "Soy Sauce Bottle Cafe",
    template: "%s | Soy Sauce Bottle Cafe",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

function PublicLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default PublicLayout;
