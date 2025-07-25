"use client";
import { apiGet } from "@/libs/api";
import useTableNumber from "@/libs/useTableNumber";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyOrderPage() {
  const [data, setData] = useState([]);
  const tableNumber = useTableNumber();

  useEffect(() => {
    const fetchData = async () => {
      if (!tableNumber) return;
      try {
        const res = await apiGet(`/pesanans/meja/${tableNumber}`);
        setData(res?.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [tableNumber]);

  return (
    <section className="min-h-screen bg-background font-poppins flex justify-center mx-auto px-[7%] py-20">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6">
          Riwayat Pesanan
          <span className="text-desc"> Meja {tableNumber}</span>
        </h1>

        {data.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada pesanan.</p>
        ) : (
          <div className="space-y-6">
            {data.map((pesanan) => (
              <div
                key={pesanan.pesanan_id}
                className="border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="mb-2 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Tanggal:{" "}
                    {new Date(pesanan.created_at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full capitalize font-medium bg-yellow-100 text-yellow-800 text-center">
                    {pesanan.status.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="space-y-4">
                  {pesanan.pesanan_details.map((detail, index) => (
                    <div
                      key={detail.pesanandetail_id}
                      className={`flex gap-4 items-start rounded p-2 ${
                        index != pesanan.pesanan_details.length - 1
                          ? "border-b"
                          : ""
                      }`}
                    >
                      <div className="w-20 h-20 mt-2 relative">
                        <Image
                          src={detail.menu.gambar}
                          alt={detail.menu.nama_menu}
                          fill
                          sizes="full"
                          className="rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg">
                          {detail.menu.nama_menu}
                        </h2>
                        <p className="text-sm text-gray-500 capitalize">
                          {detail.menu.tipe}
                        </p>
                        <div className="text-sm mt-1 flex flex-col">
                          <span>Jumlah: {detail.jumlah_pesanan}</span>
                          <span>
                            Harga: Rp{" "}
                            {Number(detail.harga_satuan).toLocaleString(
                              "id-ID"
                            )}
                          </span>
                          <span>
                            Total: Rp{" "}
                            {Number(detail.total_harga).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <span className="text-md font-semibold">
                      Total Harga: Rp{" "}
                      {Number(pesanan.total_harga).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
