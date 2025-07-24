"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getToken() {
  return getCookie("token") || "";
}

export const useClientFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(options.initialLoading ?? true);
  const [error, setError] = useState(null);

  const token = getToken();
  const axios = require("axios").create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${BASE_URL}${endpoint}`,
        options.config || {}
      );
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options.config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
