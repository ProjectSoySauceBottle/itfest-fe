"use client";

import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Sidebar from "../Navigation/Sidebar";
import DashboardNavbar from "../Navigation/Navbar";

export default function DashboardAppShell({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      withBorder={false}
      transitionDuration={"400"}
      navbar={{
        // width: "20%",
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened },
      }}
      padding="md"
    >
      <AppShell.Navbar
        // transitionDuration={"2000ms"}
        visibleFrom="sm"
        w={250}
        className="bg-green-500"
      >
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main className="bg-[#f4f5fa]">
        <div className="w-full h-12 bg-white rounded-md shadow flex justify-between items-center mb-5 transition duration-200 font-poppins text-primary">
          <DashboardNavbar toggle={toggle} opened={opened} />
        </div>
        <div>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
