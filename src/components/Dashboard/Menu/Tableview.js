"use client";
import { Avatar, Checkbox } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useForm } from "@mantine/form";
import PaginationComponent from "./Pagination";

export default function Tableview() {
  const [raw, setRaw] = useState([]);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({
    current_page: 1,
    total_page: 1,
    items_per_page: 5,
  });

  const filter = useForm({
    initialValues: {
      search: "",
      category: "",
      page: 1,
      limit: 5,
    },
  });
  useEffect(() => {
    const rawData = [
      {
        id: 1,
        name: "Espresso",
        price: 20000,
        type: "coffee",
        image_url: "/assets/images/menu/Espresso.jpg",
        description: "desc",
      },
      {
        id: 2,
        name: "Americano",
        price: 25000,
        type: "coffee",
        image_url: "/assets/images/menu/Americano.jpg",
        description: "desc",
      },
      {
        id: 3,
        name: "Latte",
        price: 25000,
        type: "coffee",
        image_url: "/assets/images/menu/Latte.jpg",
        description: "desc",
      },
      {
        id: 4,
        name: "Flat White",
        price: 25000,
        type: "coffee",
        image_url: "/assets/images/menu/Flat White.jpg",
        description: "desc",
      },
      {
        id: 5,
        name: "Mocha",
        price: 30000,
        type: "coffee",
        image_url: "/assets/images/menu/Mocha.jpg",
        description: "desc",
      },
      {
        id: 6,
        name: "Macchiato",
        price: 20000,
        type: "coffee",
        image_url: "/assets/images/menu/Macchiato.jpg",
        description: "desc",
      },

      // Non-Coffee
      {
        id: 7,
        name: "Chocolate Milk",
        price: 22000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Chocolate Milk.jpg",
        description: "desc",
      },
      {
        id: 8,
        name: "Strawberry Smoothie",
        price: 28000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Strawberry Smoothie.jpg",
        description: "desc",
      },
      {
        id: 9,
        name: "Matcha Latte",
        price: 26000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Matcha Latte.jpg",
        description: "desc",
      },
      {
        id: 10,
        name: "Green Tea",
        price: 18000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Green Tea.jpg",
        description: "desc",
      },
      {
        id: 11,
        name: "Lemon Tea",
        price: 20000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Lemon Tea.jpg",
        description: "desc",
      },
      {
        id: 12,
        name: "Chamomile Tea",
        price: 22000,
        type: "non-coffee",
        image_url: "/assets/images/menu/Chamomile Tea.jpg",
        description: "desc",
      },

      // Snack
      {
        id: 13,
        name: "Croissant",
        price: 15000,
        type: "snack",
        image_url: "/assets/images/menu/Croissant.jpg",
        description: "desc",
      },
      {
        id: 14,
        name: "Cheesecake",
        price: 30000,
        type: "snack",
        image_url: "/assets/images/menu/Cheesecake.jpg",
        description: "desc",
      },
      {
        id: 15,
        name: "French Fries",
        price: 18000,
        type: "snack",
        image_url: "/assets/images/menu/French Fries.jpg",
        description: "desc",
      },
    ];
    setRaw(rawData);
    setData(rawData);
  }, []);
  console.log(meta, "meta");

  useEffect(() => {
    const filteredData = raw.filter((item) => {
      const matchName = item.name
        ?.toLowerCase()
        .includes(filter.values.search?.toLowerCase());

      const matchCategory = filter.values.category
        ? item.type.toLowerCase() === filter.values.category.toLowerCase()
        : true;

      return matchName && matchCategory;
    });

    const start = (filter.values.page - 1) * filter.values.limit;
    const end = start + filter.values.limit;

    setMeta({
      current_page: filter.values.page,
      total_page: Math.ceil(filteredData.length / filter.values.limit) || 1,
      items_per_page: filter.values.limit,
    });

    setData(filteredData.slice(start, end));
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
          <Checkbox />
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-desc uppercase tracking-wider"
        >
          Nama
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
      {data.length ? (
        data.map((item) => (
          <tr key={item.id}>
            <td className="px-6 py-4">
              <Checkbox />
            </td>
            <td className="px-6 py-4 flex justify-start gap-2 items-center">
              <Avatar radius="xs" size="lg" src={item.image_url} />
              {item.name}
            </td>
            <td className="px-6 py-4">
              Rp{item.price.toLocaleString("id-ID")}
            </td>
            <td className="px-6 py-4">{item.type}</td>
            <td className="px-6 py-4">{item.description}</td>
            <td className="px-6 py-4">-</td>
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
      <h1 className="text-2xl font-bold text-primary">Menu</h1>
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
