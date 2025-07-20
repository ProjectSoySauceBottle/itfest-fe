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

export default function Sidebar() {
  const mockdata = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      path: "/dashboard",
      permission: ["admin", "provider", "user"],
    },
    {
      label: "User",
      icon: <FaUsers />,
      path: "/dashboard/users",
      permission: ["admin"],
    },
    {
      label: "Pesanan User",
      icon: <LuNotepadText />,
      path: "/dashboard/order-users",
      permission: ["admin"],
    },
    {
      divider: "Pembatas",
      label: "Dropdown",
      icon: <RiAlignItemLeftFill />,
      links: [
        {
          label: "Item1",
          link: "/dashboard/item1",
        },
        {
          divider: "Pembatas2",
          label: "Item2",
          link: "/dashboard/item2",
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
      className={`${classes.navbar} md:shadow h-full dark:bg-slate-800 dark:text-white transition-all duration-200`}
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
