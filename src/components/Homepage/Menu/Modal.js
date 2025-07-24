import { Modal, NumberInput, TextInput, Tooltip } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { GiNotebook } from "react-icons/gi";

export default function ModalMenu({
  opened,
  close,
  item = null,
  setSelectedItem,
}) {
  const form = useForm({
    initialValues: {
      menu_id: "",
      harga: 0,
      nama_menu: "",
      gambar: "",
      tipe: "",
      total_harga: 0,
      jumlah_pesanan: 1,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        menu_id: item.menu_id,
        nama_menu: item.nama_menu,
        gambar: item.gambar,
        tipe: item.tipe,
        harga: Number(item.harga),
        jumlah_pesanan: 1,
        total_harga: Number(item.harga),
      });
    }
  }, [item]);

  const handleChangeQty = (value) => {
    if (value == null || value == "" || value == 0) {
      form.setFieldValue("jumlah_pesanan", 1);
    } else {
      form.setFieldValue("jumlah_pesanan", value);
    }

    form.setFieldValue("total_harga", value * form.values.harga);
  };

  const handleCloseModal = () => {
    form.reset();
    setSelectedItem(null);
    close();
  };

  const handleSaveToLocal = () => {
    const existingOrders =
      JSON.parse(localStorage.getItem("notedOrders")) || [];
    const newOrder = form.values;

    // cek ada ga item dengan id yang sama
    const existingIndex = existingOrders.findIndex(
      (order) => order.menu_id === newOrder.menu_id
    );

    if (existingIndex !== -1) {
      // kalo ada update qty dan total_harga
      const existingItem = existingOrders[existingIndex];
      existingItem.jumlah_pesanan += newOrder.jumlah_pesanan;
      existingItem.total_harga =
        existingItem.jumlah_pesanan * existingItem.harga;

      existingOrders[existingIndex] = existingItem;
    } else {
      // kalo belom ada tambahin sebagai item baru
      existingOrders.push(newOrder);
    }

    // Simpan ke localStorage
    localStorage.setItem("notedOrders", JSON.stringify(existingOrders));

    window.dispatchEvent(new Event("totalOrder"));
    handleCloseModal();
  };

  const handleOrder = () => {
    window.open(
      "https://app.sandbox.midtrans.com/payment-links/1753030776776",
      "_blank"
    );
  };

  return (
    <div className="w-full">
      <Modal
        opened={opened}
        onClose={() => handleCloseModal()}
        size="auto"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton={false}
        radius="md"
        trapFocus={false}
      >
        <div className="flex flex-col items-center">
          <img
            src={item?.gambar}
            alt={item?.nama_menu}
            className="w-80 h-52 mx-auto object-cover object-center rounded mb-2"
          />
          <h3 className="font-semibold mt-4">{item?.nama_menu}</h3>
          <p className="text-gray-600">
            Rp{item?.harga && Number(item?.harga).toLocaleString("id-ID")}
          </p>

          <form className="mt-4 space-y-2">
            <div className="flex justify-between gap-3 items-center">
              <div>Jumlah</div>
              <NumberInput
                placeholder="1"
                min={1}
                value={form.values.jumlah_pesanan}
                onChange={(value) => handleChangeQty(value)}
                className="w-full max-w-40"
              />
            </div>
            <div className="flex justify-between gap-3 items-center">
              <div>Total</div>
              <TextInput
                type="number"
                placeholder="0"
                value={
                  item?.harga
                    ? Number(
                        item?.harga * form.values.jumlah_pesanan
                      ).toLocaleString("id-ID")
                    : 0
                }
                readOnly
                disabled
                className="w-full max-w-40"
              />
            </div>
          </form>

          <div className="mt-4 flex  w-full gap-2">
            <Tooltip
              label="Pesan Sekarang"
              position="bottom"
              defaultOpened="true"
              transitionProps={{ transition: "fade-up", duration: 300 }}
            >
              <button
                onClick={handleOrder}
                className="w-3/4 cursor-pointer p-2 bg-primary text-white rounded-md"
              >
                Pesan
              </button>
            </Tooltip>
            <Tooltip
              label="Catat Pesanan Dahulu"
              color="var(--primary)"
              position="bottom"
              defaultOpened="true"
              transitionProps={{ transition: "fade-up", duration: 200 }}
            >
              <button
                onClick={handleSaveToLocal}
                className="w-2/4 cursor-pointer p-2 bg-white border border-primary rounded-md"
              >
                <GiNotebook size="20" className="mx-auto" />
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </div>
  );
}
