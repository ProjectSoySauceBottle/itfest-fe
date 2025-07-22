import React, { useState } from "react";
import { FaBook, FaDashcube, FaUsers } from "react-icons/fa";
import { MdDashboard, MdTableBar } from "react-icons/md";
import { GiNotebook, GiTable } from "react-icons/gi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiPieChart2Fill } from "react-icons/ri";
import { LuNotebookText } from "react-icons/lu";

export default function Sidebar() {
  const activePath = usePathname();

  const mockdata = [
    {
      label: "Overview",
      icon: <RiPieChart2Fill />,
      path: "/dashboard",
    },
    {
      label: "Orders",
      icon: <GiNotebook />,
      path: "/dashboard/order-user",
    },
    {
      label: "Tables",
      icon: <MdTableBar />,
      path: "/dashboard/table",
    },
    {
      label: "Menus",
      icon: <LuNotebookText />,
      path: "/dashboard/menu",
    },
  ];

  return (
    <nav className="h-full py-6 px-12 font-poppins">
      <h1 className="font-bold italic text-2xl text-center">
        SSB<span className="text-desc">Cafe</span>
      </h1>

      <ul className="mt-10 space-y-4">
        {mockdata.map((item, index) => {
          return (
            <li key={index}>
              <Link
                href={item.path}
                className={`group flex items-center font-[500] p-2 text-sm rounded-lg hover:text-accent transition duration-300 ${
                  activePath === item.path
                    ? "text-accent font-semibold"
                    : "text-desc/80"
                }`}
              >
                {React.cloneElement(item.icon, {
                  className:
                    activePath === item.path
                      ? "size-5 text-accent-hover"
                      : "size-5 text-desc/80 group-hover:text-accent-hover transition duration-300",
                })}
                <span className="ml-5">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
