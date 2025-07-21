import { Group, ScrollArea } from "@mantine/core";
import React from "react";
import classes from "@/styles/SidebarStyle.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { FaBook, FaDashcube, FaUsers } from "react-icons/fa";
import { LuNotepadText } from "react-icons/lu";
import LinksGroup from "./LinksGroup";
import { MdDashboard } from "react-icons/md";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { GiNotebook } from "react-icons/gi";

export default function Sidebar() {
  const mockdata = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
      permission: ["admin", "provider", "user"],
    },
    {
      label: "Pesanan User",
      icon: <GiNotebook />,
      path: "/dashboard/order-user",
      permission: ["admin"],
    },
    {
      divider: "Manajemen",
      label: "Manajemen Meja",
      icon: <FaBook />,
      links: [
        {
          label: "Manajemen Meja",
          link: "/dashboard/table",
        },
        {
          label: "Manajemen Menu",
          link: "/dashboard/menu",
        },
      ],
      permission: ["admin"],
    },
  ];

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  return (
    <nav
      className={`${classes.navbar} md:shadow h-full transition-all duration-200`}
    >
      <div className={classes.header}>
        <Group justify="center">
          <div className="font-bold dark:text-slate-500">SSBC</div>
        </Group>
      </div>

      <ScrollArea
        scrollbarSize={1}
        offsetScrollbars
        scrollHideDelay={500}
        className={classes.links}
      >
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
