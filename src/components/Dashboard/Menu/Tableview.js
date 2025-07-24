"use client";
import { Avatar, Button, Checkbox } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useForm } from "@mantine/form";
import PaginationComponent from "./Pagination";
import ActionButton, { handleModalDeleteAll } from "./ActionButton";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useClientFetch } from "@/hook/useClientFetch";

export default function Tableview() {
  const { data: rawData, loading, error, refetch } = useClientFetch("/menus");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [raw, setRaw] = useState([]);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    total_page: 1,
    items_per_page: 5,
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const handleSelectAll = (event) => {
    if (event.currentTarget.checked) {
      const allIds = data?.map((item) => item.menu_id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filter = useForm({
    initialValues: {
      search: "",
      category: "",
      page: 1,
      limit: 5,
    },
  });

  useEffect(() => {
    setRaw(rawData);
    setData(rawData);
  }, [rawData]);

  useEffect(() => {
    const filteredData = raw?.filter((item) => {
      const matchName = item?.nama_menu
        ?.toLowerCase()
        .includes(filter.values.search?.toLowerCase());

      const matchCategory = filter.values.category
        ? item.tipe.toLowerCase() === filter.values.category.toLowerCase()
        : true;

      return matchName && matchCategory;
    });

    const start = (filter.values.page - 1) * filter.values.limit;
    const end = start + filter.values.limit;

    setMeta({
      current_page: filter.values.page,
      total_page: Math.ceil(filteredData?.length / filter.values.limit) || 1,
      items_per_page: filter.values.limit,
    });

    setData(filteredData?.slice(start, end));
  }, [
    filter.values.search,
    filter.values.category,
    filter.values.page,
    filter.values.limit,
    raw,
  ]);

  const thead = (
    <thead>
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          <Checkbox
            checked={data?.length > 0 && selectedIds.length === data.length}
            indeterminate={
              selectedIds.length > 0 && selectedIds.length < data.length
            }
            onChange={handleSelectAll}
          />
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          {selectedIds.length > 0 ? (
            <Button
              color="red"
              onClick={() =>
                handleModalDeleteAll(selectedIds, refetch, setLoadingDelete)
              }
              loading={loadingDelete}
              disabled={loadingDelete}
            >
              <FaRegTrashCan size={18} />
            </Button>
          ) : (
            "Nama"
          )}
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Harga
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Kategori
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Deskripsi
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Aksi
        </th>
      </tr>
    </thead>
  );
  const tbody = (
    <tbody className="divide-y divide-gray-200 text-sm text-primary">
      {data?.length ? (
        data.map((item) => (
          <tr key={item.menu_id}>
            <td className="px-6 py-4">
              <Checkbox
                checked={selectedIds.includes(item.menu_id)}
                onChange={() => handleSelectRow(item.menu_id)}
              />
            </td>
            <td className="px-6 py-4 flex justify-start gap-2 items-center">
              <Avatar radius="xs" size="lg" src={item.gambar} />
              {item.nama_menu}
            </td>
            <td className="px-6 py-4">
              Rp{Number(item.harga).toLocaleString("id-ID")}
            </td>
            <td className="px-6 py-4">{item.tipe}</td>
            <td className="px-6 py-4">{item.deskripsi}</td>
            <td>
              <ActionButton item={item} refetch={refetch} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center py-4">
            Data Tidak Ditemukan
          </td>
        </tr>
      )}
    </tbody>
  );

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Menu</h1>
        <Link href="/dashboard/menu/create">
          <Button>
            <FiPlus size={18} /> Buat
          </Button>
        </Link>
      </div>
      <Filter filter={filter} />
      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {thead}
          {tbody}
        </table>
        <PaginationComponent meta={meta} filter={filter} />
      </div>
    </div>
  );
}
