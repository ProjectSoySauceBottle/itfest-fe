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
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened, desktop: opened },
      }}
      padding="md"
    >
      <AppShell.Navbar
        // transitionDuration={"2000ms"}
        visibleFrom="sm"
      >
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main className="bg-[#e3f7f9]">
        <div className="w-full h-12 bg-[#0bbfcd] rounded-md shadow flex justify-between items-center mb-5 transition duration-200">
          <DashboardNavbar toggle={toggle} opened={opened} />
        </div>
        <div>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
}
