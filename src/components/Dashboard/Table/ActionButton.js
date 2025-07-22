import { Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoCheckmarkOutline } from "react-icons/io5";
import Link from "next/link";

export const handleModalDeleteAll = (values) => {
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
    onConfirm: () => handleDeleteAll(values),
  });
};

const handleDeleteAll = (values) => {
  //   const res = await axios.delete(`/api/table/${value.id}`);
  const res = true;
  if (res) {
    notifications.show({
      title: "Success",
      message: `Berhasil menghapus semua barang`,
      icon: <IoCheckmarkOutline size={18} />,
      color: "green",
      autoClose: true,
    });
    // fetchData();
  }
};

export default function ActionButton({ item }) {
  const handleModalDelete = (value) =>
    modals.openConfirmModal({
      children: (
        <div className="font-poppins text-center font-semibold mb-8">
          <div>
            Apakah anda yakin ingin menghapus "{value?.name ?? value?.title}" ?
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
    try {
      //   const res = await axios.delete(`/api/table/${value.id}`);
      const res = true;
      if (res) {
        notifications.show({
          title: "Success",
          message: `Berhasil menghapus ${value?.name ?? value.title}`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        // fetchData();
      }
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: `Gagal menghapus ${value?.name ?? value.title}`,
        icon: <RiCloseLargeFill size={18} />,
        color: "red",
        autoClose: true,
      });
    }
  };
  return (
    <div className="flex gap-3">
      <Button color="red" onClick={() => handleModalDelete(item)}>
        <FaRegTrashCan size={18} />
      </Button>
      <Link href={`/dashboard/table/${item?.id}`}>
        <Button color="yellow">
          <FaEdit size={18} />
        </Button>
      </Link>
    </div>
  );
}
