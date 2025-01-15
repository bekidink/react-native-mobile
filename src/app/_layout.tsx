import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/src/hooks/useColorScheme";
import { secureStoreStorage } from "../storage";
import NavigationUtils from "../utils/navigationUtils";
import { ToastProvider } from "react-native-toast-notifications";
import { jwtDecode } from "jwt-decode";
import useCustomToast from "../utils/useToast";
import { refetchUser, refresh_tokens } from "../services/authService";
import { useAuthStore } from "../state/authStore";
interface DecodedToken {
  exp: number;
}
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { showToast } = useCustomToast();
  const colorScheme = useColorScheme();
  const { setUser, user } = useAuthStore.getState();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const checkLogged = async () => {
    const accessToken = await secureStoreStorage.getItem("accessToken");
    const refreshToken = await secureStoreStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
      const currentTime = Date.now() / 1000;
      if (decodedRefreshToken?.exp < currentTime) {
        NavigationUtils.navigate("customerLogin");
        showToast("Session Expired.Please login again", "info");
        return false;
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens();
          await refetchUser(setUser);
        } catch (error) {
          showToast("Something  went wrong");
        }
      }
      if (user?.role === "Customer") {
        NavigationUtils.navigate("dashboard");
      } else {
        NavigationUtils.navigate("delivery");
      }
      return true;
    }
    NavigationUtils.navigate("customerLogin");
    return false;
  };
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      checkLogged();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ToastProvider
        placement="top"
        duration={3000}
        animationType="slide-in"
        textStyle={{ color: "white" }}
        offset={50} // Adjust as needed
      >
        <Stack>
          <Stack.Screen name="customerLogin" />
          <Stack.Screen name="deliveryLogin" />
          <Stack.Screen name="dashboard" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ToastProvider>
    </ThemeProvider>
  );
}
