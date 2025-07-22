import { Avatar } from "@mantine/core";
import React from "react";
import { MdAttachMoney, MdTableBar } from "react-icons/md";
import { LuNotebookText } from "react-icons/lu";
import { FaWallet } from "react-icons/fa";
import { BarChart } from "@mantine/charts";

export default function Dashboard() {
  const data = [
    { month: "January", coffee: 1800, "non-coffee": 1200, snack: 900 },
    { month: "February", coffee: 1650, "non-coffee": 1100, snack: 950 },
    { month: "March", coffee: 1900, "non-coffee": 1300, snack: 1000 },
    { month: "April", coffee: 2000, "non-coffee": 1500, snack: 1150 },
    { month: "May", coffee: 2200, "non-coffee": 1700, snack: 1300 },
    { month: "June", coffee: 2100, "non-coffee": 1850, snack: 1400 },
  ];

  return (
    <section className="p-8">
      <div className="flex justify-start gap-5 ">
        <div className="bg-white shadow w-full min-w-56 h-28 rounded-lg flex items-center px-2">
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

        <div className="bg-white shadow w-full min-w-56 h-28 rounded-lg flex items-center px-2">
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

        <div className="bg-white shadow w-full min-w-56 h-28 rounded-lg flex items-center px-2">
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
      <div className="mt-10 bg-white shadow rounded-lg p-8">
        <BarChart
          h={300}
          data={data}
          dataKey="month"
          tooltipAnimationDuration={200}
          series={[
            { name: "coffee", color: "violet.6" },
            { name: "non-coffee", color: "blue.6" },
            { name: "snack", color: "teal.6" },
          ]}
          barProps={{ radius: "0 0 10 0" }}
        />
      </div>
    </section>
  );
}
