"use client";

import FadeIn from "@/components/Animation/FadeInAnimation";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import ModalMenu from "../Menu/Modal";
import NotedMenu from "../Menu/NotedMenu";
import { GiNotebook } from "react-icons/gi";
import { useClientFetch } from "@/hook/useClientFetch";

export default function RecommendedMenu() {
  const { data, loading, error } = useClientFetch("/menus");

  const [notedOrdersTotal, setNotedOrdersTotal] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // drawer open
  const [drawerOpened, setDrawerOpened] = useState(false);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    open();
  };

  useEffect(() => {
    const updateNotedOrders = () => {
      const stored = localStorage.getItem("notedOrders");
      const notedOrders = stored ? JSON.parse(stored) : [];
      const totalOrder = notedOrders.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setNotedOrdersTotal(totalOrder || null);
    };

    updateNotedOrders();
    window.addEventListener("totalOrder", updateNotedOrders);
    return () => {
      window.removeEventListener("totalOrder", updateNotedOrders);
    };
  }, []);

  const Card = () => {
    return (
      <div className="mt-10 mb-20 w-full cursor-pointer">
        {data?.length > 0 ? (
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-4 items-center justify-center">
            {data.slice(0, 3).map((item, index) => (
              <FadeIn key={item.menu_id} direction="right" delay={index * 100}>
                <div
                  key={index}
                  onClick={() => handleModalOpen(item)}
                  className="bg-white rounded shadow p-4"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama_menu}
                    className="w-full h-52 object-cover object-center rounded mb-2"
                  />
                  <h3 className="font-semibold">{item.nama_menu}</h3>
                  <p className="text-gray-600">
                    Rp{Number(item.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        ) : (
          <div>Menu Belum Tersedia</div>
        )}
        <Carousel className="sm:hidden">
          {data.slice(0, 3).map((item) => (
            <Carousel.Slide key={item.menu_id}>
              <FadeIn direction="right">
                <div
                  onClick={() => handleModalOpen(item)}
                  className="bg-white rounded shadow p-4"
                >
                  <img
                    src={item.gambar}
                    alt={item.nama_menu}
                    className="w-full h-52 object-cover object-center rounded mb-2"
                  />
                  <h3 className="font-semibold">{item.nama_menu}</h3>
                  <p className="text-gray-600">
                    Rp{Number(item.harga).toLocaleString("id-ID")}
                  </p>
                </div>
              </FadeIn>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <section className="bg-background text-primary font-poppins px-[7%]">
      <NotedMenu
        drawerOpened={drawerOpened}
        setDrawerOpened={setDrawerOpened}
      />
      <ModalMenu
        opened={opened}
        close={close}
        item={selectedItem}
        setSelectedItem={setSelectedItem}
      />
      <h2 className="font-bold text-2xl md:text-4xl text-center mt-20">
        <span className="text-desc">Recommended</span> Menu
      </h2>
      <div className="flex justify-center">
        <Card />
      </div>
      <button
        onClick={() => setDrawerOpened(true)}
        className="fixed bottom-10 -right-8 bg-primary text-white border border-background size-[4rem] rounded-full cursor-pointer"
      >
        <GiNotebook size={20} className="ml-2" />
        {notedOrdersTotal > 0 && (
          <span className="absolute -bottom-2 left-2 text-white bg-red-500 rounded-full p-1 size-5 flex justify-center items-center text-[10px]">
            {notedOrdersTotal}
          </span>
        )}
      </button>
    </section>
  );
}
