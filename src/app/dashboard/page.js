import { Avatar } from "@mantine/core";
import React from "react";
import { MdAttachMoney, MdTableBar } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { FaWallet } from "react-icons/fa";
import { Group, Text } from "@mantine/core";
import { PieChart } from "@mantine/charts";

export default function Dashboard() {
  const data = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 300, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
  return (
    <section className="p-8">
      <div className="flex justify-start flex-wrap gap-5 ">
        <div className="bg-white shadow w-56 h-28 rounded-lg flex items-center px-2">
          <div className="w-5/12 flex justify-center">
            <Avatar variant="light" radius="xl" size="lg" color="grape">
              <MdTableBar size={24} />
            </Avatar>
          </div>
          <div>
            <div className="font-semibold">20</div>
            <p className="text-sm text-desc font-[500]">Available Table</p>
          </div>
        </div>

        <div className="bg-white shadow w-56 h-28 rounded-lg flex items-center px-2">
          <div className="w-5/12 flex justify-center">
            <Avatar variant="light" radius="xl" size="lg" color="blue">
              <LuNotebookText size={24} />
            </Avatar>
          </div>
          <div>
            <div className="font-semibold">32</div>
            <p className="text-sm text-desc font-[500]">Total Menu</p>
          </div>
        </div>

        <div className="bg-white shadow w-56 h-28 rounded-lg flex items-center px-2">
          <div className="w-5/12 flex justify-center">
            <Avatar variant="light" radius="xl" size="lg" color="orange">
              <FaWallet size={24} />
            </Avatar>
          </div>
          <div>
            <div className="font-semibold">Rp2.000.000</div>
            <p className="text-xs text-desc font-[500]">Avg. Daily Revenue</p>
          </div>
        </div>
      </div>

      {/* chart */}
      <Group gap={50}>
        <div>
          <Text fz="xs" mb="sm" ta="center">
            Data only for hovered segment
          </Text>
          <PieChart
            data={data}
            withTooltip
            tooltipDataSource="segment"
            mx="auto"
          />
        </div>

        <div>
          <Text fz="xs" mb="sm" ta="center">
            Data only for all segments
          </Text>
          <PieChart data={data} withTooltip mx="auto" />
        </div>
      </Group>
    </section>
  );
}
