"use client";
import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
} from "@mantine/core";
import { CiLock, CiUser } from "react-icons/ci";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { apiPost } from "@/libs/api";
import { setCookie } from "cookies-next";

export default function FormControl() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const { data, error } = await apiPost("/admin/login", form.values);

    if (!error) {
      notifications.show({
        title: "Success",
        message: `Login Berhasil`,
        icon: <CiUser size={18} />,
        color: "green",
        autoClose: true,
      });
      setCookie("token", data?.token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      setCookie("user", data?.user, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      router.push("/dashboard");
      form.reset();
      return;
    }
    notifications.show({
      title: "Failed",
      message: `Login Gagal : ${error?.response?.data?.message ?? ""}`,
      icon: <RiCloseLargeFill size={18} />,
      color: "red",
      autoClose: true,
    });
    form.resetField("password");
  };
  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <TextInput
        leftSection={<CiUser size={18} />}
        placeholder="Your email"
        required
        radius="md"
        size="md"
        {...form.getInputProps("email")}
      />

      <PasswordInput
        leftSection={<CiLock size={18} />}
        placeholder="Your password"
        required
        radius="md"
        size="md"
        {...form.getInputProps("password")}
      />

      <Group position="apart" align="center" className="-mt-2 mb-2">
        <Checkbox
          label="Remember me"
          size="sm"
          {...form.getInputProps("remember", { type: "checkbox" })}
        />
      </Group>

      <Button
        type="submit"
        fullWidth
        radius="md"
        size="md"
        className="bg-blue-700 hover:bg-blue-800"
      >
        login
      </Button>
    </form>
  );
}
