import FormControl from "@/components/Dashboard/Table/FormControl";
import { useServerFetch } from "@/libs/useServerFetch";
import React from "react";

export default async function EditTablePage({ params }) {
  const { id } = await params;
  const { data, error } = await useServerFetch(`/mejas/${id}`);

  return (
    <section className="p-8 font-poppins text-primary bg-white">
      <h1 className="font-bold text-xl">Edit Meja</h1>
      <FormControl table={data} />
    </section>
  );
}
