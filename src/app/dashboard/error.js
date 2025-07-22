"use client";
import { Button } from "@mantine/core";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center pt-16 bg-background text-primary">
      <h2>{error?.message}</h2>
      <Button onClick={() => reset()} color="yellow" href="/">
        Retry
      </Button>
    </div>
  );
}
