import axios from "axios";
import { BASE_URL } from "./config";
import { secureStoreStorage } from "../storage";
import { refresh_tokens } from "./authService";
import useCustomToast from "../utils/useToast";
export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (config) => {
  const accessToken = await secureStoreStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {}
    }
    if (error.response && error.response.status != 401) {
      const errorMessage =
        error.response.data.message || "something went wrong";
      const { showToast } = useCustomToast();
      showToast(errorMessage, "error");
    }
    return Promise.resolve(error);
  }
);
