import DashboardAppShell from "@/components/Dashboard/Layout/DashboardAppShell";

export const metadata = {
  title: {
    default: "Soy Sauce Bottle Cafe",
    template: "%s | Soy Sauce Bottle Cafe",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

function DashboardLayout({ children }) {
  return <DashboardAppShell children={children} />;
}
export default DashboardLayout;
