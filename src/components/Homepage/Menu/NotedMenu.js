import { Drawer, Button, Divider, Text } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";

const dummyCart = [
  {
    id: 1,
    name: "Latte",
    image: "/assets/images/menu/latte.jpg",
    price: 5000,
    qty: 2,
  },
  {
    id: 2,
    name: "Croissant",
    image: "/assets/images/menu/Croissant.jpg",
    price: 15000,
    qty: 1,
  },
];

export default function NotedMenu({ drawerOpened, setDrawerOpened }) {
  const totalHarga = dummyCart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

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
        {dummyCart.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 border border-primary p-2 rounded-lg shadow-sm"
          >
            <div className="relative w-full h-36 max-w-48">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="full"
                objectFit="cover"
                objectPosition="center"
                className="rounded-md"
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-primary text-sm">
                {item.name}
              </div>
              <div className="text-desc text-xs">
                Harga: Rp{item.price.toLocaleString()}
              </div>
              <div className="text-desc text-xs">Jumlah: x{item.qty}</div>
              <div className="font-semibold text-accent text-sm">
                Total: Rp{(item.price * item.qty).toLocaleString("id-ID")}
              </div>
            </div>
            <button className="text-red-500 hover:text-red-700 mt-1">
              <FaTrash size={18} />
            </button>
          </div>
        ))}

        <Divider />

        <div className="flex justify-between items-center px-2">
          <div className="text-sm font-semibold">Total Keseluruhan</div>
          <div className="text-sm font-bold">
            Rp{totalHarga.toLocaleString("id-ID")}
          </div>
        </div>

        <Button fullWidth color="blue" radius="md" size="md" mt="sm">
          Pesan Sekarang
        </Button>
      </div>
    </Drawer>
  );
}
