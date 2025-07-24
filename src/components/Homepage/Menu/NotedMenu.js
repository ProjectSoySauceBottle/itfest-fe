"use client";

import { Drawer, Button, Divider, Text } from "@mantine/core";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function NotedMenu({ drawerOpened, setDrawerOpened }) {
  const [notedOrders, setNotedOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("notedOrders");
    setNotedOrders(stored ? JSON.parse(stored) : []);
  }, [drawerOpened]);
  const totalHarga = notedOrders.reduce(
    (acc, item) => acc + item.total_harga,
    0
  );

  const handleDelete = (index) => {
    const updatedOrders = notedOrders.filter((_, i) => i !== index);
    setNotedOrders(updatedOrders);
    localStorage.setItem("notedOrders", JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event("totalOrder"));
  };
  const handleOrder = () => {
    window.open(
      "https://app.sandbox.midtrans.com/payment-links/1753030776776",
      "_blank"
    );
  };
  return (
    <Drawer
      opened={drawerOpened}
      onClose={() => setDrawerOpened(false)}
      title="Catatan Pesanan Anda"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      position="right"
      size="md"
      transitionProps={{ duration: 300 }}
    >
      <div className="space-y-4 font-poppins">
        {notedOrders.length > 0 ? (
          notedOrders?.map((item, index) => (
            <div
              key={item.menu_id}
              className="flex items-start gap-4 border border-primary p-2 rounded-lg shadow-sm"
            >
              <div className="relative w-full h-36 max-w-48">
                <Image
                  src={item.gambar}
                  alt={item.nama_menu}
                  fill
                  sizes="full"
                  className="object-cover object-center rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-primary text-sm">
                  {item.nama_menu}
                </div>
                <div className="text-desc text-xs">
                  Harga: Rp{item.harga.toLocaleString("id-ID")}
                </div>
                <div className="text-desc text-xs">
                  Jumlah: x{item.jumlah_pesanan}
                </div>
                <div className="font-semibold text-sm">
                  Total: Rp{item.total_harga.toLocaleString("id-ID")}
                </div>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="cursor-pointer text-red-500 hover:text-red-700 mt-1"
              >
                <FaTrash size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="flex justify-center gap-4 p-5 rounded-lg text-sm bg-desc text-background">
            Belum Ada Pesanan
          </div>
        )}

        <Divider />

        <div className="flex justify-between items-center px-2">
          <div className="text-sm font-semibold">Total Keseluruhan</div>
          <div className="text-sm font-bold">
            Rp{totalHarga.toLocaleString("id-ID")}
          </div>
        </div>

        <Button
          onClick={handleOrder}
          fullWidth
          color="var(--primary)"
          radius="md"
          size="md"
          mt="sm"
          disabled={notedOrders.length === 0}
        >
          Pesan Sekarang
        </Button>
      </div>
    </Drawer>
  );
}
