import * as SecureStore from "expo-secure-store";

// Custom SecureStore-based storage for zustand
export const secureStoreStorage = {
  getItem: async (key: string) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value || null;
    } catch (error) {
      console.error(
        `Error getting item from SecureStore for key "${key}":`,
        error
      );
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(
        `Error setting item in SecureStore for key "${key}":`,
        error
      );
    }
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error(
        `Error removing item from SecureStore for key "${key}":`,
        error
      );
    }
  },
};
