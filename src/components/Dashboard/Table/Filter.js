import { Select, TextInput } from "@mantine/core";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Filter({ filter }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <TextInput
        label={<div className="text-primary">Cari Nomor Meja</div>}
        placeholder="cari nomor meja"
        leftSection={<CiSearch />}
        className="w-full"
        {...filter.getInputProps("search")}
      />
    </div>
  );
}
