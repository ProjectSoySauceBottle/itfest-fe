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
      id: "",
      price: 0,
      name: "",
      image_url: "",
      type: "",
      total_price: 0,
      quantity: 1,
    },
  });

  useEffect(() => {
    if (item) {
      form.setValues({
        id: item.id,
        name: item.name,
        image_url: item.image_url,
        type: item.type,
        price: Number(item.price),
        quantity: 1,
        total_price: item.price,
      });
    }
  }, [item]);

  const handleChangeQty = (value) => {
    if (value == null || value == "" || value == 0) {
      form.setFieldValue("quantity", 1);
    } else {
      form.setFieldValue("quantity", value);
    }

    form.setFieldValue("total_price", value * form.values.price);
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
      (order) => order.id === newOrder.id
    );

    if (existingIndex !== -1) {
      // kalo ada update qty dan total_price
      const existingItem = existingOrders[existingIndex];
      existingItem.quantity += newOrder.quantity;
      existingItem.total_price = existingItem.quantity * existingItem.price;

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
            src={item?.image_url}
            alt={item?.name}
            className="w-80 h-52 mx-auto object-cover object-center rounded mb-2"
          />
          <h3 className="font-semibold mt-4">{item?.name}</h3>
          <p className="text-gray-600">
            Rp{item?.price && Number(item?.price).toLocaleString("id-ID")}
          </p>

          <form className="mt-4 space-y-2">
            <div className="flex justify-between gap-3 items-center">
              <div>Jumlah</div>
              <NumberInput
                placeholder="1"
                min={1}
                value={form.values.quantity}
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
                  item?.price
                    ? Number(item?.price * form.values.quantity).toLocaleString(
                        "id-ID"
                      )
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
              <button className="w-3/4 cursor-pointer p-2 bg-primary text-white rounded-md">
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
