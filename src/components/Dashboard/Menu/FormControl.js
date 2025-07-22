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

export default function FormControl({ menu = null }) {
  const form = useForm({
    initialValues: {
      name: menu?.name || "",
      type: menu?.type || "",
      price: menu?.price || null,
      image_url: menu?.image_url || null,
      description: menu?.description || "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Nama harus terdiri dari 2 huruf" : null,
      type: (value) => (value.length < 1 ? "Kategori harus diisi" : null),
      price: (value) => (value < 1 ? "Harga harus lebih besar dari 0" : null),
      description: (value) =>
        value.length < 1 ? "Deskripsi harus diisi" : null,
    },
  });
  const [file, setFile] = useState(null);

  const router = useRouter();
  const handleCancel = () => {
    form.reset();
    setFile(null);
    router.push("/dashboard/menu");
  };

  const handleSubmit = () => {
    form.setFieldValue("image_url", file);
    try {
      const res = true;
      notifications.show({
        title: "Success",
        message: `Berhasil membuat menu baru`,
        icon: <IoCheckmarkOutline size={18} />,
        color: "green",
        autoClose: true,
      });
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: `Gagal membuat menu baru`,
        icon: <RiCloseLargeFill size={18} />,
        color: "green",
        autoClose: true,
      });
    }

    form.reset();
    setFile(null);
    router.push("/dashboard/menu");
  };

  const removeFile = () => {
    setFile(null);
  };

  const previewDefault = (
    <div className="border border-desc text-center rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        <Image
          src={menu?.image_url}
          alt="image"
          fill
          sizes="full"
          className="object-cover"
        />
      </div>
      <Tooltip label={menu?.name}>
        <div className="py-3 text-sm text-center border-t border-b">
          {menu?.name}
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
  console.log(file, " file", form.values, "form", menu, "menu");

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="mt-4">
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label={<div className="text-primary">Nama Menu</div>}
          placeholder="Nama Menu"
          {...form.getInputProps("name")}
        />
        <NumberInput
          hideControls
          label={<div className="text-primary">Harga</div>}
          placeholder="0"
          decimalSeparator=","
          thousandSeparator="."
          leftSection={<div className="text-primary text-sm">Rp</div>}
          {...form.getInputProps("price")}
        />
        <Select
          label={<div className="text-primary">Kategori Menu</div>}
          placeholder="Semua"
          data={[
            { value: "coffee", label: "Coffee" },
            { value: "non-coffee", label: "Non-Coffee" },
            { value: "snack", label: "Snack" },
          ]}
          {...form.getInputProps("type")}
        />
        <Textarea
          label={<div className="text-primary">Deskripsi</div>}
          placeholder="Deskripsi"
          resize="vertical"
          rows={1}
          {...form.getInputProps("description")}
        />

        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => {
            setFile(files[0]);
          }}
          hidden={file || menu}
        >
          <div
            className={`border-desc/40 mx-auto rounded-md border border-dashed w-52 h-52 flex justify-center items-center cursor-pointer ${
              form.errors.picture ? "text-red-500 border-red-500" : ""
            }`}
          >
            <div className="font-semibold text-desc/70">Upload Foto</div>
          </div>
        </Dropzone>
        {menu && !file ? previewDefault : previews()}
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
