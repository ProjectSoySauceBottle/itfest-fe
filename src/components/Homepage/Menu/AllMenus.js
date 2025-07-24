"use client";

import FadeIn from "@/components/Animation/FadeInAnimation";
import { Carousel } from "@mantine/carousel";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import ModalMenu from "./Modal";
import NotedMenu from "./NotedMenu";
import { FaAngleDoubleLeft, FaArrowLeft } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";

export default function AllMenus({ data, searchType = null }) {
  const [notedOrdersTotal, setNotedOrdersTotal] = useState(null);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dataType = [
    ...new Set(
      data
        ?.filter((item) => {
          if (searchType) {
            return item.tipe === searchType;
          } else {
            return item;
          }
        })
        .map((item) => item.tipe)
    ),
  ];

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
        (acc, item) => acc + item.jumlah_pesanan,
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

  const Card = ({ type }) => {
    return (
      <div key={type} className="mt-20 w-full cursor-pointer">
        <h2 className="text-xl font-bold mb-4 capitalize">
          {type == "non_coffee" ? "Non Coffee" : type}
        </h2>
        {data?.filter((item) => item.tipe === type)?.length > 0 ? (
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data
              .filter((item) => item.tipe === type)
              .map((item, index) => (
                <FadeIn
                  key={item.menu_id}
                  direction="right"
                  delay={index * 100}
                >
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
          {data
            .filter((item) => item.tipe === type)
            .map((item) => (
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
                    <h3 className="font-semibold">{item.nam_menu}</h3>
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
    <>
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
      <div className="flex flex-col items-center">
        {dataType.length > 0 ? (
          dataType.map((type, index) => <Card key={type} type={type} />)
        ) : (
          <div className="mt-20 w-full text-center bg-[#dcdcdc] py-4 rounded-md inset-shadow-sm">
            Menu <span className="font-bold">{searchType}</span> Tidak Tersedia
          </div>
        )}
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
    </>
  );
}
