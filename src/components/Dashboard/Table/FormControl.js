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

export default function FormControl({ table = null }) {
  const form = useForm({
    initialValues: {
      tableNumber: table?.tableNumber || "",
    },
    validate: {
      tableNumber: (value) =>
        value.length < 1 ? "Nomor meja harus diisi" : null,
    },
  });

  const router = useRouter();
  const handleCancel = () => {
    form.reset();
    router.push("/dashboard/table");
  };

  const handleSubmit = () => {
    try {
      const res = true;
      notifications.show({
        title: "Success",
        message: `Berhasil membuat data meja baru`,
        icon: <IoCheckmarkOutline size={18} />,
        color: "green",
        autoClose: true,
      });
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: `Gagal membuat data meja baru`,
        icon: <RiCloseLargeFill size={18} />,
        color: "green",
        autoClose: true,
      });
    }

    form.reset();
    router.push("/dashboard/table");
  };

  const removeFile = () => {
    setFile(null);
  };

  const previewDefault = (
    <div className="border border-desc text-center rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        <Image
          src={table?.image_url}
          alt="image"
          fill
          sizes="full"
          className="object-cover"
        />
      </div>
      <Tooltip label={table?.name}>
        <div className="py-3 text-sm text-center border-t border-b">
          {table?.name}
        </div>
      </Tooltip>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(pict) => {
          setFile(pict[0]);
        }}
      >
        <div className={`flex justify-center items-center cursor-pointer`}>
          <Button variant="transparent" ta="center">
            Ganti Gambar
          </Button>
        </div>
      </Dropzone>
    </div>
  );
  const previews = () => {
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="border border-desc text-center rounded-lg overflow-hidden">
        <div className="relative w-full h-64">
          <Image
            src={imageUrl}
            alt="image"
            fill
            sizes="full"
            className="object-cover"
            onLoad={() => URL.revokeObjectURL(imageUrl)}
          />
        </div>
        <div className="py-3 text-sm text-center border-t border-b">
          {file.name}
        </div>
        <Button
          variant="transparent"
          color="gray"
          onClick={() => removeFile(file)}
          className="mx-auto"
        >
          Remove
        </Button>
      </div>
    );
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
          {...form.getInputProps("tableNumber")}
        />
      </div>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button type="submit" color="blue">
          Simpan
        </Button>
        <Button variant="light" color="grey" onClick={handleCancel}>
          Batal
        </Button>
      </div>
    </form>
  );
}
