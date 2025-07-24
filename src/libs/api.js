// lib/api.js
import axios from "axios";
import { getCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getToken() {
  return getCookie("token") || "";
}
const instance = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiGet = async (endpoint, config = {}) => {
  try {
    const res = await instance.get(endpoint, config);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const apiPost = async (endpoint, body = {}, config = {}) => {
  try {
    const res = await instance.post(endpoint, body, config);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const apiPut = async (endpoint, body = {}, config = {}) => {
  try {
    const res = await instance.put(endpoint, body, config);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const apiDelete = async (endpoint, config = {}) => {
  try {
    const res = await instance.delete(endpoint, config);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
