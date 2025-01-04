import axios from "axios";

const authBaseURL = "https://connections-api.goit.global";

export const authAxiosInstance = axios.create({
  baseURL: authBaseURL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export const setAuthAxios = (token) => {
  if (token) {
    authAxiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    delete authAxiosInstance.defaults.headers.common["Authorization"];
  }
};
