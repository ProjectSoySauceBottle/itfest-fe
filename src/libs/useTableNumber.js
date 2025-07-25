"use client";
import { useEffect, useState } from "react";

export default function useTableNumber() {
  const [meja, setMeja] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("meja");
    if (stored) {
      setMeja(stored);
    }
  }, []);

  return meja;
}
