import { Select, TextInput } from "@mantine/core";
import React from "react";
import { CiSearch } from "react-icons/ci";

export default function Filter({ filter }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      {/* <TextInput
        placeholder="cari menu"
        label={<div className="text-primary">Cari Menu</div>}
        leftSection={<CiSearch />}
        className="w-full"
        {...filter.getInputProps("search")}
      /> */}
      <TextInput
        placeholder="cari nomor meja"
        label={<div className="text-primary">Cari Nomor Meja</div>}
        leftSection={<CiSearch />}
        className="w-full"
        {...filter.getInputProps("searchTable")}
      />
      <Select
        label={<div className="text-primary">Status</div>}
        placeholder="status"
        data={[
          { value: "pending", label: "unpaid" },
          { value: "paid", label: "paid" },
        ]}
        className="w-full"
        {...filter.getInputProps("status")}
      />
    </div>
  );
}
