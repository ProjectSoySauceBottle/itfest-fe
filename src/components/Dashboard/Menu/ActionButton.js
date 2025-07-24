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
    await Promise.all(values.map((item) => apiDelete(`/menus/${item}`)));
    notifications.show({
      title: "Success",
      message: `Berhasil menghapus semua barang`,
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
      message: `Gagal menghapus semua barang`,
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
            {value?.nama_menu ?? value?.menu_id}" ?
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
    try {
      const { data, error } = await apiDelete(`/menus/${value.menu_id}`);
      if (data) {
        notifications.show({
          title: "Success",
          message: `Berhasil menghapus ${value?.nama_menu ?? value.menu_id}`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        refetch();
      }
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: `Gagal menghapus ${value?.nama_menu ?? value.menu_id}`,
        icon: <RiCloseLargeFill size={18} />,
        color: "red",
        autoClose: true,
      });
    } finally {
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
      <Link href={`/dashboard/menu/${item?.menu_id}`}>
        <Button color="yellow">
          <FaEdit size={18} />
        </Button>
      </Link>
    </div>
  );
}
