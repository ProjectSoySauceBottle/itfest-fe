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
import Image from "next/image";

export default function Tableview() {
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
      const allIds = data.map((item) => item.id);
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
      page: 1,
      limit: 5,
    },
  });
  useEffect(() => {
    const rawData = [
      {
        id: 1,
        tableNumber: "1",
        qr_code_path: "/assets/images/qrcode.png",
      },
      {
        id: 2,
        tableNumber: "2",
        qr_code_path: "/assets/images/qrcode.png",
      },
      {
        id: 3,
        tableNumber: "3",
        qr_code_path: "/assets/images/qrcode.png",
      },
      {
        id: 4,
        tableNumber: "4",
        qr_code_path: "/assets/images/qrcode.png",
      },
      {
        id: 5,
        tableNumber: "5",
        qr_code_path: "/assets/images/qrcode.png",
      },
      {
        id: 6,
        tableNumber: "6",
        qr_code_path: "/assets/images/qrcode.png",
      },
    ];
    setRaw(rawData);
    setData(rawData);
  }, []);

  useEffect(() => {
    const filteredData = raw.filter((item) => {
      const matchNumber = item.tableNumber.includes(filter.values.search);

      return matchNumber;
    });

    const start = (filter.values.page - 1) * filter.values.limit;
    const end = start + filter.values.limit;

    setMeta({
      current_page: filter.values.page,
      total_page: Math.ceil(filteredData.length / filter.values.limit) || 1,
      items_per_page: filter.values.limit,
    });

    setData(filteredData.slice(start, end));
  }, [filter.values.search, filter.values.page, filter.values.limit, raw]);

  const thead = (
    <thead>
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          <Checkbox
            checked={data.length > 0 && selectedIds.length === data.length}
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
          {selectedIds.length === data.length ? (
            <Button
              color="red"
              onClick={() => handleModalDeleteAll(selectedIds)}
            >
              <FaRegTrashCan size={18} />
            </Button>
          ) : (
            "Nomor Meja"
          )}
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Kode QR
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
      {data.length ? (
        data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4">
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onChange={() => handleSelectRow(item.id)}
              />
            </td>
            <td className="px-6 py-4 text-lg">#{item.tableNumber}</td>
            <td className="px-6 py-4">
              <div className="relative size-32">
                <Image
                  src={item.qr_code_path}
                  alt={item.tableNumber}
                  fill
                  sizes="full"
                  className="object-cover"
                />
              </div>
            </td>
            <td>
              <ActionButton item={item} />
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
        <h1 className="text-2xl font-bold text-primary">Meja</h1>
        <Link href="/dashboard/table/create">
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
