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
import { apiPut, apiPost } from "@/libs/api";

export default function FormControl({ menu = null }) {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      nama_menu: menu?.nama_menu || "",
      tipe: menu?.tipe || "",
      harga: menu?.harga || null,
      gambar: menu?.gambar || null,
      deskripsi: menu?.deskripsi || "",
    },
    validate: {
      nama_menu: (value) =>
        value.length < 2 ? "Nama harus terdiri dari 2 huruf" : null,
      tipe: (value) => (value.length < 1 ? "Kategori harus diisi" : null),
      harga: (value) => (value < 1 ? "Harga harus lebih besar dari 0" : null),
      // gambar: (value) => (value == null ? "Deskripsi harus diisi" : null),
      deskripsi: (value) => (value.length < 1 ? "Deskripsi harus diisi" : null),
    },
  });
  const [file, setFile] = useState(null);

  const router = useRouter();
  const handleCancel = () => {
    form.reset();
    setFile(null);
    router.push("/dashboard/menu");
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("nama_menu", form.values.nama_menu);
    formData.append("tipe", form.values.tipe);
    formData.append("harga", form.values.harga);
    formData.append("deskripsi", form.values.deskripsi);

    if (file) {
      formData.append("gambar", file);
    }

    if (menu) {
      const { data, error } = await apiPut(`/menus/${menu.menu_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!error) {
        notifications.show({
          title: "Success",
          message: `Berhasil membuat menu baru`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        setLoading(false);
        form.reset();
        setFile(null);
        router.push("/dashboard/menu");
      } else {
        notifications.show({
          title: "Failed",
          message: `Gagal membuat menu baru`,
          icon: <RiCloseLargeFill size={18} />,
          color: "red",
          autoClose: true,
        });
        setLoading(false);
      }
    } else {
      const { data, error } = await apiPost("/menus", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!error) {
        notifications.show({
          title: "Success",
          message: `Berhasil membuat menu baru`,
          icon: <IoCheckmarkOutline size={18} />,
          color: "green",
          autoClose: true,
        });
        setLoading(false);
        form.reset();
        setFile(null);
        router.push("/dashboard/menu");
      } else {
        notifications.show({
          title: "Failed",
          message: `Gagal membuat menu baru`,
          icon: <RiCloseLargeFill size={18} />,
          color: "red",
          autoClose: true,
        });
        setLoading(false);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const previewDefault = (
    <div className="border border-desc text-center rounded-lg overflow-hidden">
      <div className="relative w-full h-64">
        <Image
          src={menu?.gambar || null}
          alt="image"
          fill
          sizes="full"
          className="object-cover"
        />
      </div>
      <Tooltip label={menu?.nama_menu}>
        <div className="py-3 text-sm text-center border-t border-b">
          {menu?.nama_menu}
        </div>
      </Tooltip>
      <Dropzone
        accept={IMAGE_MIME_TYPE}
        onDrop={(pict) => {
          setFile(pict[0]);
          form.setFieldValue("gambar", pict[0]);
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
        <TextInput
          label={<div className="text-primary">Nama Menu</div>}
          placeholder="Nama Menu"
          {...form.getInputProps("nama_menu")}
        />
        <NumberInput
          hideControls
          label={<div className="text-primary">Harga</div>}
          placeholder="0"
          decimalSeparator=","
          thousandSeparator="."
          leftSection={<div className="text-primary text-sm">Rp</div>}
          {...form.getInputProps("harga")}
        />
        <Select
          label={<div className="text-primary">Kategori Menu</div>}
          placeholder="Semua"
          data={[
            { value: "coffee", label: "Coffee" },
            { value: "non_coffee", label: "Non Coffee" },
            { value: "snack", label: "Snack" },
          ]}
          {...form.getInputProps("tipe")}
        />
        <Textarea
          label={<div className="text-primary">Deskripsi</div>}
          placeholder="Deskripsi"
          resize="vertical"
          rows={1}
          {...form.getInputProps("deskripsi")}
        />

        <Dropzone
          accept={IMAGE_MIME_TYPE}
          onDrop={(files) => {
            setFile(files[0]);
            form.setFieldValue("gambar", files[0]);
          }}
          hidden={file || menu}
        >
          <div
            className={`border-desc/40 mx-auto rounded-md border border-dashed w-52 h-52 flex justify-center items-center cursor-pointer ${
              form.errors.gambar ? "text-red-500 border-red-500" : ""
            }`}
          >
            <div className="font-semibold text-desc/70">Upload Foto</div>
          </div>
        </Dropzone>
        {menu && !file ? previewDefault : previews()}
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
