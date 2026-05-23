import api from "./api";
import { LOCAL_STORAGE_KEYS } from "../constants";

export const login = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(data.user));
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
};

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
