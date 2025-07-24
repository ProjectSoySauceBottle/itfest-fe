// lib/api.js
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  //   withCredentials: true, // jika pakai cookie auth
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

export const apiPatch = async (endpoint, body = {}, config = {}) => {
  try {
    const res = await instance.patch(endpoint, body, config);
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
