import axios from "axios";
import { BASE_URL } from "./config";
import { secureStoreStorage } from "../storage";
import { useAuthStore } from "../state/authStore";
import { appAxios } from "./apiInterceptors";
export const customerLogin = async (phone: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
    const { accessToken, refreshToken } = response.data;
    secureStoreStorage.setItem("accessToken", accessToken);
    secureStoreStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(response.data.customer);
  } catch (error) {}
};

export const deliveryLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/delivery/login`, {
      email,
      password,
    });
    const { accessToken, refreshToken } = response.data;
    secureStoreStorage.setItem("accessToken", accessToken);
    secureStoreStorage.setItem("refreshToken", refreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(response.data.deliveryPartner);
  } catch (error) {}
};
export const refresh_tokens = async () => {
  try {
    const refreshToken = secureStoreStorage.getItem("refreshToken");
    const response = await axios.post(`${BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    secureStoreStorage.setItem("accessToken", newAccessToken);
    secureStoreStorage.setItem("refreshToken", newRefreshToken);
    const { setUser } = useAuthStore.getState();
    setUser(response.data.customer);
    return newAccessToken;
  } catch (error) {
    secureStoreStorage.removeItem("accessToken");
    secureStoreStorage.removeItem("refreshToken");
  }
};

export const refetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get("/user");
    setUser(response.data.user);
  } catch (error) {}
};
