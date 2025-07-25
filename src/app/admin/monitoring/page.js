"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { apiGet, apiPut } from "@/libs/api"; // Pastikan apiPut tersedia
import { Select } from "@mantine/core";

const statusOptions = ["all", "dalam_antrian", "diproses", "selesai"];
const statusColors = {
  dalam_antrian: "bg-yellow-100 text-yellow-800",
  diproses: "bg-blue-100 text-blue-800",
  selesai: "bg-green-100 text-green-800",
};

export default function OrderMonitoring() {
  const [pesanans, setPesanans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("dalam_antrian");

  const fetchPesanans = async () => {
    try {
      const res = await apiGet("/pesanans");
      setPesanans(res?.data || []);
    } catch (error) {
      console.error("Gagal fetch pesanan:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh otomatis setiap 10 detik
  useEffect(() => {
    fetchPesanans();
    const interval = setInterval(fetchPesanans, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id, statusBaru) => {
    try {
      await apiPut(`/pesanans/${id}`, { status: statusBaru });
      fetchPesanans(); // Refresh data setelah update
    } catch (error) {
      console.error("Gagal ubah status:", error);
    }
  };

  const filteredPesanans =
    filterStatus === "all"
      ? pesanans
      : pesanans.filter((p) => p.status === filterStatus);

  return (
    <section className="min-h-screen bg-background text-primary font-poppins py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Monitoring Pesanan</h1>
        <Select
          placeholde="status"
          className="rounded px-3 py-1 text-sm"
          value={filterStatus}
          data={statusOptions}
          onChange={(e) => setFilterStatus(e)}
        />
      </div>

      {loading ? (
        <p>Loading pesanan...</p>
      ) : filteredPesanans.length === 0 ? (
        <p className="text-gray-500">Belum ada pesanan.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPesanans.map((pesanan) => (
            <div
              key={pesanan.pesanan_id}
              className="bg-white rounded-xl shadow-sm p-4 space-y-4 border border-desc"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  Meja {pesanan.meja?.nomor_meja || "-"}
                </h2>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                    statusColors[pesanan.status]
                  }`}
                >
                  {pesanan.status}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                {new Date(pesanan.created_at).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              <div className="space-y-2">
                {pesanan.pesanan_details.map((item) => (
                  <div
                    key={item.pesanandetail_id}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                      <Image
                        src={item.menu.gambar}
                        alt={item.menu.nama_menu}
                        fill
                        sizes="full"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.menu.nama_menu}</p>
                      <p className="text-sm text-gray-500">
                        {item.jumlah_pesanan}x — Est:{" "}
                        {item.menu.estimasi_pembuatan} menit
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ubah status */}
              <div className="pt-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Ubah Status:
                </label>
                <Select
                  placeholde="status"
                  className="w-full rounded px-2 py-1 text-sm"
                  data={[
                    { value: "dalam_antrian", label: "dalam antrian" },
                    { value: "diproses", label: "diproses" },
                    { value: "selesai", label: "selesai" },
                  ]}
                  value={pesanan.status}
                  onChange={(e) => handleStatusChange(pesanan.pesanan_id, e)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
