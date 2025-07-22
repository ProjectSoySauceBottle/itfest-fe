import { Burger, Drawer, Flex, Image, Menu, Text } from "@mantine/core";
import React from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { RiHome3Line } from "react-icons/ri";

const DashboardNavbar = ({ toggle, opened, darkMode }) => {
  const profile = "assets/images/dummy_profile.jpg";
  const user = {
    first_name: "Admin",
    last_name: null,
    address: null,
    email: "admin@mail.com",
    company: null,
    subdomain: null,
    role: {
      id: 1,
      name: "admin",
      created_at: "2025-05-21T00:01:03.000000Z",
      updated_at: "2025-05-21T00:01:03.000000Z",
    },
    path_picture: profile,
  };

  const router = useRouter();
  return (
    <>
      <Burger
        onClick={toggle}
        size="sm"
        className="ml-2 duration-[400ms]"
        color={`${darkMode ? "white" : "black"}`}
      />
      <Drawer hiddenFrom="sm" opened={opened} onClose={toggle}>
        <Sidebar />
      </Drawer>

      <div className="mr-2 cursor-pointer">
        <div className="flex items-center">
          <Menu
            width={200}
            transitionProps={{
              transition: "pop-top-right",
              duration: 150,
            }}
          >
            <Menu.Target>
              <Image
                src={user?.path_picture ? `/${user?.path_picture}` : profile}
                className="!w-8 !h-8 object-contain !rounded-full"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <div className="flex gap-2 items-center">
                  {/* <div className="rounded-full w-10 h-10 border-2"></div> */}
                  <Image
                    src={profile}
                    className="!w-10 !h-10 object-contain !rounded-full"
                  />
                  <div>
                    <Text size="sm">{`${user?.first_name ?? ""} ${
                      user?.last_name ?? ""
                    }`}</Text>
                    <Text size="sm" className="!opacity-70">
                      {user?.role?.name ?? ""}
                    </Text>
                  </div>
                </div>
              </Menu.Label>
              <Menu.Divider />
              <Menu.Item onClick={() => router.push("/")}>
                <Flex align={"center"} gap={8}>
                  <RiHome3Line size={"1.2rem"} color="grey" />
                  <div>Home</div>
                </Flex>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("profile.edit")}>
                <Flex align={"center"} gap={8}>
                  <FaRegUser size={"1.2rem"} color="grey" />
                  <div>Profile</div>
                </Flex>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  router.push("/logout");
                  handleClearCookie();
                }}
              >
                <Flex align={"center"} gap={8}>
                  <TbLogout2 size={"1.2rem"} color="grey" />
                  <div>Logout</div>
                </Flex>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default DashboardNavbar;
