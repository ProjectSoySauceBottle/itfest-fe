import { Select, TextInput } from "@mantine/core";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Filter({ filter }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <TextInput
        placeholder="Cari Menu"
        label={<div className="text-primary">Cari Menu</div>}
        leftSection={<CiSearch />}
        className="w-full"
        {...filter.getInputProps("search")}
      />
      <Select
        label={<div className="text-primary">Kategori Menu</div>}
        placeholder="Semua"
        data={[
          { value: "coffee", label: "Coffee" },
          { value: "non_coffee", label: "Non Coffee" },
          { value: "snack", label: "Snack" },
        ]}
        className="w-full"
        {...filter.getInputProps("category")}
      />
    </div>
  );
}
