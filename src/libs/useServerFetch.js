// lib/serverFetch.js
import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useServerFetch = async (endpoint, config = {}) => {
  const cookieStore = cookies();
  const token = cookieStore?.get("token")?.value;
  console.log("token", token);

  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
