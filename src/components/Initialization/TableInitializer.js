"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function MejaInitializer() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const meja = searchParams.get("meja");

    if (meja) {
      localStorage.setItem("meja", meja);
      const url = new URL(window.location.href);
      url.searchParams.delete("meja");
      window.history.replaceState({}, "", url);
    }
  }, [searchParams]);

  return null;
}
