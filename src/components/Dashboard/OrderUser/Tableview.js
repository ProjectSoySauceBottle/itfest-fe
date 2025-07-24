"use client";
import { Avatar, Badge, Button, Checkbox } from "@mantine/core";
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
  const {
    data: rawData,
    loading,
    error,
    refetch,
  } = useClientFetch("/pesanans");
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
      searchTable: "",
      status: "",
      page: 1,
      limit: 5,
    },
  });
  // useEffect(() => {
  //   const rawData = [
  //     {
  //       id: 1,
  //       table: {
  //         id: 3,
  //         tableNumber: "3",
  //         qr_code_path: "/assets/images/qrcode.png",
  //       },
  //       menu: {
  //         id: 1,
  //         name: "Espresso",
  //         price: 20000,
  //         type: "coffee",
  //         image_url: "/assets/images/menu/Espresso.jpg",
  //         description: "desc",
  //       },
  //       status: "pending",
  //       quantity: 2,
  //       total_price: 40000,
  //       payment_method: "qris",
  //     },
  //     {
  //       id: 2,
  //       table: {
  //         id: 4,
  //         tableNumber: "4",
  //         qr_code_path: "/assets/images/qrcode.png",
  //       },
  //       menu: {
  //         id: 2,
  //         name: "Americano",
  //         price: 25000,
  //         type: "coffee",
  //         image_url: "/assets/images/menu/Americano.jpg",
  //         description: "desc",
  //       },
  //       status: "delivered",
  //       quantity: 1,
  //       total_price: 25000,
  //       payment_method: "qris",
  //     },
  //     {
  //       id: 3,
  //       table: {
  //         id: 6,
  //         tableNumber: "6",
  //         qr_code_path: "/assets/images/qrcode.png",
  //       },
  //       menu: {
  //         id: 1,
  //         name: "Espresso",
  //         price: 20000,
  //         type: "coffee",
  //         image_url: "/assets/images/menu/Espresso.jpg",
  //         description: "desc",
  //       },
  //       status: "pending",
  //       quantity: 1,
  //       total_price: 20000,
  //       payment_method: "cash",
  //     },
  //     {
  //       id: 4,
  //       table: {
  //         id: 1,
  //         tableNumber: "1",
  //         qr_code_path: "/assets/images/qrcode.png",
  //       },
  //       menu: {
  //         id: 13,
  //         name: "Croissant",
  //         price: 15000,
  //         type: "snack",
  //         image_url: "/assets/images/menu/Croissant.jpg",
  //         description: "desc",
  //       },
  //       status: "delivered",
  //       quantity: 2,
  //       total_price: 30000,
  //       payment_method: "qris",
  //     },
  //   ];
  //   setRaw(rawData);
  //   setData(rawData);
  // }, []);
  useEffect(() => {
    setRaw(rawData);
    setData(rawData);
  }, [rawData]);

  // useEffect(() => {
  //   const filteredData = raw?.filter((item) => {
  //     const matchName = item?.menu?.nama_menu
  //       ?.toLowerCase()
  //       .includes(filter.values.search?.toLowerCase());

  //     const matchTableNumber = item?.meja?.nomor_meja?.includes(
  //       filter.values.searchTable
  //     );

  //     const matchStatus = filter.values.status
  //       ? item?.status_bayar === filter.values.status
  //       : true;

  //     return matchName && matchTableNumber && matchStatus;
  //   });

  //   const start = (filter.values.page - 1) * filter.values.limit;
  //   const end = start + filter.values.limit;

  //   setMeta({
  //     current_page: filter.values.page,
  //     total_page: Math.ceil(filteredData?.length / filter.values.limit) || 1,
  //     items_per_page: filter.values.limit,
  //   });

  //   setData(filteredData?.slice(start, end));
  // }, [
  //   filter.values.search,
  //   filter.values.searchTable,
  //   filter.values.status,
  //   filter.values.page,
  //   filter.values.limit,
  //   raw,
  // ]);

  const thead = (
    <thead>
      <tr>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          <Checkbox
            checked={data?.length > 0 && selectedIds?.length === data?.length}
            indeterminate={
              selectedIds?.length > 0 && selectedIds?.length < data?.length
            }
            onChange={handleSelectAll}
          />
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          {selectedIds?.length > 0 ? (
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
            "Nomor Meja"
          )}
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Nama Menu
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Jumlah Pesanan
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Total Harga
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Metode Bayar
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Status
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
          <tr key={item.pesanan_id}>
            <td className="px-6 py-4">
              <Checkbox
                checked={selectedIds.includes(item.pesanan_id)}
                onChange={() => handleSelectRow(item.pesanan_id)}
              />
            </td>
            <td className="px-6 py-4">#{item?.meja?.nomor_meja}</td>
            <td className="px-6 py-4">{item?.menu?.nama_menu}</td>
            <td className="px-6 py-4">{item?.jumlah_pesanan}</td>
            <td className="px-6 py-4">
              Rp{Number(item?.total_harga)?.toLocaleString("id-ID")}
            </td>
            <td className="px-6 py-4">{item?.metode_bayar}</td>
            <td className="px-6 py-4">
              <Badge
                variant="light"
                color={item?.status_bayar == "pending" ? "yellow" : "green"}
              >
                {item?.status_bayar}
              </Badge>
            </td>
            <td>
              <ActionButton item={item} refetch={refetch} />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={10} className="text-center py-4">
            Data Tidak Ditemukan
          </td>
        </tr>
      )}
    </tbody>
  );

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Pesanan User</h1>
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
