import Tableview from "@/components/Dashboard/Menu/Tableview";
import { useServerFetch } from "@/libs/useServerFetch";
import React from "react";

export default async function MenuPage() {
  const { data, error } = await useServerFetch("/menus");
  return (
    <section className="p-8 font-poppins">
      <Tableview rawData={data} />
    </section>
  );
}
