"use client";

import { apiPost } from "@/libs/api";
import { Drawer, Button, Divider, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";

export default function NotedMenu({ drawerOpened, setDrawerOpened }) {
  const [notedOrders, setNotedOrders] = useState([]);
  const [tableNumber, setTableNumber] = useState("");

  useEffect(() => {
    const meja = localStorage.getItem("meja");
    if (meja) {
      setTableNumber(meja);
    }
  }, []);
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

  function formatOrderPayload({ notedOrders, mejaId, metodeBayar }) {
    const jumlah_pesanan = notedOrders.reduce(
      (sum, item) => sum + item.jumlah_pesanan,
      0
    );
    const total_harga = notedOrders.reduce(
      (sum, item) => sum + item.total_harga,
      0
    );

    return {
      meja_id: mejaId,
      metode_bayar: metodeBayar, // "cashless" untuk QRIS
      status_bayar: "pending", // Default status
      jumlah_pesanan,
      total_harga,
      items: notedOrders.map((item) => ({
        menu_id: item.menu_id,
        jumlah: item.jumlah_pesanan,
      })),
    };
  }

  const handleOrder = async () => {
    const payload = formatOrderPayload({
      notedOrders,
      mejaId: tableNumber,
      metodeBayar: "cashless",
    });
    try {
      const { data } = await apiPost("/pesanans/cashless_payment", payload);

      if (data?.success) {
        window.snap.pay(data.snap, {
          onSuccess: async function (result) {
            console.log("Pembayaran berhasil:", result);
            console.log("dataa window", data);
            notifications.show({
              title: "Success",
              message: `Pembayaran Berhasil`,
              icon: <IoCheckmarkOutline size={18} />,
              color: "green",
              autoClose: true,
            });
            const { data: resData, error } = await apiPost(
              `/pesanans/${data.pesanan_id}/update-status`,
              { status_bayar: "paid" }
            );

            localStorage.setItem("notedOrders", "[]");
          },
          onPending: function (result) {
            console.log("Menunggu pembayaran:", result);
          },
          onError: function (result) {
            console.error("Pembayaran error:", result);
            notifications.show({
              title: "Failed",
              message: `Gagal menghapus semua barang`,
              icon: <RiCloseLargeFill size={18} />,
              color: "red",
              autoClose: true,
            });
          },
          onClose: function () {
            console.log("User menutup modal tanpa menyelesaikan pembayaran");
          },
        });
      }
    } catch (err) {
      console.error("Gagal membuat order:", err);
    }
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
