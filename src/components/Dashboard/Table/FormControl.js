"use client";
import {
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";
import { IoCheckmarkOutline, IoCloudUploadOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { apiPost, apiPut } from "@/libs/api";

export default function FormControl({ table = null }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      nomor_meja: table?.nomor_meja || "",
    },
    validate: {
      nomor_meja: (value) =>
        value.length < 1 ? "Nomor meja harus diisi" : null,
    },
  });

  const router = useRouter();
  const handleCancel = () => {
    form.reset();
    router.push("/dashboard/table");
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (table) {
      const { data, error } = await apiPut(
        `/mejas/${table.meja_id}`,
        form.values
      );

      if (!error) {
        notifications.show({
          title: "Success",
          message: `Berhasil membuat nomor meja baru`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        setLoading(false);
        form.reset();
        router.push("/dashboard/table");
      } else {
        notifications.show({
          title: "Failed",
          message: `Gagal membuat nomor meja baru`,
          icon: <RiCloseLargeFill size={18} />,
          color: "red",
          autoClose: true,
        });
        setLoading(false);
      }
    } else {
      const { data, error } = await apiPost("/mejas", form.values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!error) {
        notifications.show({
          title: "Success",
          message: `Berhasil membuat nomor meja baru`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        setLoading(false);
        form.reset();
        router.push("/dashboard/table");
      } else {
        notifications.show({
          title: "Failed",
          message: `Gagal membuat nomor meja baru`,
          icon: <RiCloseLargeFill size={18} />,
          color: "red",
          autoClose: true,
        });
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          hideControls
          label={<div className="text-primary">Nomor Meja</div>}
          placeholder="1"
          decimalSeparator=","
          thousandSeparator="."
          {...form.getInputProps("nomor_meja")}
        />
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button type="submit" color="blue" loading={loading} disabled={loading}>
          Simpan
        </Button>
        <Button variant="light" color="grey" onClick={handleCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
}
