import FormControl from "@/components/Dashboard/Menu/FormControl";
import React from "react";

export default async function EditMenuPage({ params }) {
  const { id } = await params;
  const data = {
    id: 1,
    name: "Espresso",
    price: 20000,
    type: "coffee",
    image_url: "/assets/images/menu/Espresso.jpg",
    description: "desc",
  };

  return (
    <section className="p-8 font-poppins text-primary bg-white">
      <h1 className="font-bold text-xl">Edit Menu</h1>
      <FormControl menu={data} />
    </section>
  );
}
