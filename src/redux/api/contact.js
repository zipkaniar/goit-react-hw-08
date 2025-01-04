import axios from "axios";

export const contactAxios = axios.create({
  baseURL: "https://connections-api.goit.global",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const setContactAxios = (token) => {
  if (token) {
    contactAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete contactAxios.defaults.headers.common["Authorization"];
  }
};
