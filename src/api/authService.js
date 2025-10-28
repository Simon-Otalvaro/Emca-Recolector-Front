import api from "./axiosConfig";

export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};
