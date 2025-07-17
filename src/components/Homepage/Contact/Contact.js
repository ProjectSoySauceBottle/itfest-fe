"use client";
import FadeIn from "@/components/Animation/FadeInAnimation";
import { Input, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React from "react";
import { FaMailBulk, FaPhone, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

export default function Contact() {
  const inputStyle = {
    input: {
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
      border: "1px solid #eee",
      borderRadius: "4px",
    },
  };
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: {
      name: (value) =>
        value.length > 2 ? null : "Nama harus terdiri dari 2 huruf",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Email yang anda masukkan salah",
      phone: (value) =>
        /^\d+$/.test(value)
          ? null
          : "Nomor telepon yang anda masukkan salah salah",
      message: (value) =>
        value.length > 2 ? null : "Nama harus terdiri dari 2 huruf",
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
    // const res = await submit(data);
    form.reset();
    notifications.show({
      title: "Success",
      color: "green",
      autoClose: 3500,
      withCloseButton: false,
      message: "Pesan berhasil dikirim",
    });
  };
  return (
    <section id="contact" className="min-h-screen pt-20 pb-6 px-[7%]">
      <FadeIn>
        <h2 className="font-bold text-2xl md:text-4xl text-center">
          <span className="text-desc">Kontak</span> Kami
        </h2>
      </FadeIn>
      <FadeIn direction="up" delay={200}>
        <p className="max-w-[30rem] text-center text-sm text-desc mx-auto mt-4 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas unde
          optio fugiat alias deleniti sapiente!
        </p>
      </FadeIn>

      <FadeIn delay={400}>
        <div className="flex flex-wrap md:flex-nowrap mt-8 bg-primary inset-shadow inset-shadow-red-400 shadow-white/50 gap-5 rounded-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.464314266766!2d106.80359067437969!3d-6.589064143404594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5d2e602b501%3A0x25a12f0f97fac4ee!2sSekolah%20Vokasi%20Institut%20Pertanian%20Bogor!5e0!3m2!1sid!2sid!4v1751610350068!5m2!1sid!2sid"
            allowFullScreen="False"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full md:w-7/12 h-64 md:h-auto"
          ></iframe>

          <form
            onSubmit={form.onSubmit((values) => handleSubmit(values))}
            className="w-full md:w-5/12 text-center pl-2 pr-5 py-8"
          >
            <TextInput
              type="text"
              placeholder="Nama"
              leftSection={<FaUser />}
              mb="sm"
              styles={inputStyle}
              {...form.getInputProps("name")}
            />
            <TextInput
              type="text"
              placeholder="Email"
              leftSection={<FaMailBulk />}
              mb="sm"
              styles={inputStyle}
              {...form.getInputProps("email")}
            />
            <TextInput
              type="number"
              placeholder="+62 838-9535-7387"
              leftSection={<FaPhone />}
              mb="sm"
              styles={inputStyle}
              {...form.getInputProps("phone")}
            />
            <Textarea
              type="text"
              placeholder="Tulis pesanmu di sini..."
              mb="sm"
              minRows={4}
              maxRows={4}
              autosize
              styles={inputStyle}
              {...form.getInputProps("message")}
            />
            <button
              type="submit"
              className="py-2 px-12 mx-auto bg-primary rounded-md cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}
