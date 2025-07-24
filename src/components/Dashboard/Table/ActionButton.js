import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";
import { apiDelete } from "@/libs/api";

export const handleModalDeleteAll = (values, refetch, setLoadingDelete) => {
  modals.openConfirmModal({
    children: (
      <div className="font-poppins text-center font-semibold mb-8">
        <div>Apakah anda yakin ingin menghapus semua barang ?</div>
        <small className="text-xs text-gray-800">
          Anda tidak dapat memulihkan barang ini!
        </small>
      </div>
    ),
    centered: true,
    withCloseButton: false,
    confirmProps: {
      className: "!bg-red-500 !text-white !px-5 hover:!bg-red-700",
    },
    cancelProps: {
      className: "!bg-desc !text-white !px-5 hover:!bg-desc/70",
    },
    groupProps: { className: "!flex-row-reverse !justify-center !gap-10" },
    labels: { confirm: "Ya, Hapus", cancel: "Batal" },
    onConfirm: () => handleDeleteAll(values, refetch, setLoadingDelete),
  });
};

const handleDeleteAll = async (values, refetch, setLoadingDelete) => {
  setLoadingDelete(true);
  try {
    await Promise.all(values.map((item) => apiDelete(`/mejas/${item}`)));
    notifications.show({
      title: "Success",
      message: `Berhasil menghapus semua nomor meja`,
      icon: <IoCheckmarkOutline size={18} />,
      color: "green",
      autoClose: true,
    });
    setLoadingDelete(false);
    await refetch();
  } catch (error) {
    console.log(error, "delete all");
    notifications.show({
      title: "Failed",
      message: `Gagal menghapus semua nomor meja`,
      icon: <RiCloseLargeFill size={18} />,
      color: "red",
      autoClose: true,
    });
    setLoadingDelete(false);
  }
};

export default function ActionButton({ item, refetch }) {
  const [loading, setLoading] = useState(false);
  const handleModalDelete = (value) =>
    modals.openConfirmModal({
      children: (
        <div className="font-poppins text-center font-semibold mb-8">
          <div>
            Apakah anda yakin ingin menghapus "
            {value?.nomor_meja ?? value?.meja_id}" ?
          </div>
          <small className="text-xs text-gray-800">
            Anda tidak dapat memulihkan barang ini!
          </small>
        </div>
      ),
      centered: true,
      withCloseButton: false,
      confirmProps: {
        className: "!bg-red-500 !text-white !px-5 hover:!bg-red-700",
      },
      cancelProps: {
        className: "!bg-desc !text-white !px-5 hover:!bg-desc/70",
      },
      groupProps: { className: "!flex-row-reverse !justify-center !gap-10" },
      labels: { confirm: "Ya, Hapus", cancel: "Batal" },
      onConfirm: () => handleDelete(value),
    });

  const handleDelete = async (value) => {
    setLoading(true);
    const { data, error } = await apiDelete(`/mejas/${value.meja_id}`);
    if (!error) {
      notifications.show({
        title: "Success",
        message: `Berhasil menghapus ${value?.nomor_meja ?? value?.meja_id}`,
        icon: <IoCheckmarkOutline size={18} />,
        color: "green",
        autoClose: true,
      });
      setLoading(false);
      refetch();
    } else {
      notifications.show({
        title: "Failed",
        message: `Gagal menghapus ${value?.nomor_meja ?? value?.meja_id}`,
        icon: <RiCloseLargeFill size={18} />,
        color: "red",
        autoClose: true,
      });
      setLoading(false);
    }
  };
  return (
    <div className="flex gap-3">
      <Button
        color="red"
        onClick={() => handleModalDelete(item)}
        loading={loading}
        disabled={loading}
      >
        <FaRegTrashCan size={18} />
      </Button>
      <Link href={`/dashboard/table/${item?.meja_id}`}>
        <Button color="yellow">
          <FaEdit size={18} />
        </Button>
      </Link>
    </div>
  );
}
