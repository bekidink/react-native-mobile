import { FC, ReactNode } from "react";
import { SafeAreaView, StyleSheet, Text, View, ViewStyle } from "react-native";

interface CustomSafeAreaProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomSafeArea: FC<CustomSafeAreaProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
export default CustomSafeArea;
