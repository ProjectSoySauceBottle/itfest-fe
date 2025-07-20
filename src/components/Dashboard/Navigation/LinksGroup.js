import {
  Box,
  Collapse,
  Divider,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import React, { useState } from "react";
import classes from "@/styles/LinksGroupStyle.module.css";
import { useEffect } from "react";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

const LinksGroup = ({ icon, label, initiallyOpened, links, path, divider }) => {
  const url = usePathname();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const router = useRouter();
  const items = (hasLinks ? links : []).map((link, index) => {
    useEffect(() => {
      if (url?.split("?")[0] == link?.link) {
        setOpened(true);
      }
    }, []);
    return (
      <div key={`${label}-${index}`}>
        {link.divider && (
          <Divider label={link.divider} className={classes.link} />
        )}
        <Link
          component="a"
          className={`${classes.link} ${
            url?.split("?")[0] === link.link
              ? "bg-sky-100 !border-solid !border-r-4 !border-sky-500"
              : "!bg-white dark:!bg-slate-800"
          } hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 transition duration-200`}
          href={link.link}
          key={link.label}
          // onClick={(e) => e.preventDefault()}
        >
          {link.label}
        </Link>
      </div>
    );
  });
  return (
    <>
      {divider && <Divider label={divider} />}
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={`${classes.control} ${
          url?.split("?")[0] == path
            ? "!bg-gradient-to-l from-sky-100 to-sky-200 !border-solid !border-r-4 !border-l-2 !border-sky-500 dark:!bg-none"
            : "!bg-white dark:!bg-slate-800"
        } hover:bg-slate-100 dark:bg-slate-800 dark:text-white transition duration-200`}
      >
        <Group
          justify="space-between"
          onClick={
            hasLinks ? (e) => e.preventDefault() : () => router.push(path)
          }
          gap={0}
        >
          <Box className="flex items-center">
            <ThemeIcon variant="light" size={30}>
              {icon}
            </ThemeIcon>
            <Box ml={"md"}>{label}</Box>
          </Box>
          {hasLinks && (
            <MdOutlineKeyboardArrowRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: "16px",
                height: "16px",
                transform: opened ? "rotate(-90deg)" : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse animateOpacity={false} in={opened}>
          {items}
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
