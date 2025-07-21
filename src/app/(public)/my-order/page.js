"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyOrderPage() {
  const notedOrders = [
    {
      id: 3,
      name: "Latte",
      image_url: "/assets/images/menu/Latte.jpg",
      type: "coffee",
      price: 25000,
      total_price: 50000,
      quantity: 2,
      status: "sedang dibuat",
      estimated: "10 - 15 menit",
      orderTime: "2025-07-17T10:30:00Z",
      deliveredAt: null,
    },
    {
      id: 7,
      name: "Chocolate Milk",
      image_url: "/assets/images/menu/Chocolate Milk.jpg",
      type: "non-coffee",
      price: 22000,
      total_price: 22000,
      quantity: 1,
      status: "dikirim",
      estimated: "8 - 10 menit",
      orderTime: "2025-07-17T11:00:00Z",
      deliveredAt: null,
    },
    {
      id: 8,
      name: "Strawberry Smoothie",
      image_url: "/assets/images/menu/Strawberry Smoothie.jpg",
      type: "non-coffee",
      price: 28000,
      total_price: 28000,
      quantity: 1,
      status: "Selesai",
      estimated: "8 - 10 menit",
      orderTime: "2025-07-17T11:00:00Z",
      deliveredAt: "2025-07-17T09:45:00Z",
    },
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const paidOrders = notedOrders;
    setOrders(paidOrders);
  }, []);

  return (
    <section className="min-h-screen bg-background flex justify-center mx-auto px-[7%] py-20">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="w-24 h-24 relative">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    sizes="full"
                    className="rounded-md object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
                        item.status === "sedang dibuat"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "dikirim"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500">
                    Tanggal:{" "}
                    {new Date(item.orderTime).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <div className="text-sm mt-1 flex flex-col">
                    <span>Qty: {item.quantity}</span>
                    <span>Harga: Rp {item.price.toLocaleString()}</span>
                    <span>
                      Total: Rp {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  {item.estimated && item.status !== "Selesai" && (
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium">Estimasi: </span>
                      {item.estimated}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
