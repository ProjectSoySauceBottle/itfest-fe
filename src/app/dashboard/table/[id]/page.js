import FormControl from "@/components/Dashboard/Table/FormControl";
import React from "react";

export default async function EditTablePage({ params }) {
  const { id } = await params;
  const data = {
    id: 3,
    tableNumber: "3",
    qr_code_path: "/assets/images/qrcode.png",
  };

  return (
    <section className="p-8 font-poppins text-primary bg-white">
      <h1 className="font-bold text-xl">Edit Meja</h1>
      <FormControl table={data} />
    </section>
  );
}
