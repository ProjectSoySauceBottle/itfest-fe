// lib/serverFetch.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useServerFetch = async (endpoint, config = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}${endpoint}`, config);
    console.log("testtingnihg", res.data);

    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
