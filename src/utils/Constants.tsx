import { Dimensions, Platform } from "react-native";

export enum Colors {
  primary = "#f7ca49",
  primary_light = "#ffe141",
  secondary = "#0d8320",
  text = "#363636",
  disabled = "#9197a6",
  border = "#d0d4dc",
  backgroundSecondary = "#f5f6fb",
}
export enum Fonts {
  Regular = "Okra-Regular",
  Medium = "Okra-Medium",
  Light = "Okra-MediumLight",
  SemiBold = "Okra-Bold",
  Bold = "Okra-ExtraBold",
}

export const lightColors = [
  "rgba(255,255,255,1)",
  "rgba(255,255,255,0.9)",
  "rgba(255,255,255,0.7)",
  "rgba(255,255,255,0.6)",
  "rgba(255,255,255,0.5)",
  "rgba(255,255,255,0.4)",
  "rgba(255,255,255,0.003)",
];

export const darkWeatherColors: readonly [string, string, ...string[]] = [
  "rgba(54, 67, 92, 1)",
  "rgba(54, 67, 92, 0.9)",
  "rgba(54, 67, 92, 0.8)",
  "rgba(54, 67, 92, 0.2)",
  "rgba(54, 67, 92, 0.0)",
];

export const screenWidth: number = Dimensions.get("window").width;
export const screenHeight: number = Dimensions.get("window").height;
export const NoticeHeight =
  Platform.OS === "ios" ? screenHeight * 0.12 : screenHeight * 0.07;
