import FormControl from "@/components/Dashboard/Menu/FormControl";
import { useServerFetch } from "@/libs/useServerFetch";
import React from "react";

export default async function EditMenuPage({ params }) {
  const { id } = await params;
  const { data, error } = await useServerFetch(`/menus/${id}`);
  return (
    <section className="p-8 font-poppins text-primary bg-white">
      <h1 className="font-bold text-xl">Edit Menu</h1>
      <FormControl menu={data} />
    </section>
  );
}
