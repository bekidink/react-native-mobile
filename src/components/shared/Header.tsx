import { FC } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";
import { Fonts } from "@/src/utils/Constants";
import { RFValue } from "react-native-responsive-fontsize";

const Header: FC<{ showNotice: () => void }> = ({ showNotice }) => {
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText fontFamily={Fonts.Bold} variant="h8" style={styles.text}>
          Delivery in
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            fontFamily={Fonts.SemiBold}
            variant="h2"
            style={styles.text}
          >
            10 minutes
          </CustomText>
          <TouchableOpacity style={styles.noticeBtn}>
            <CustomText
              fontSize={RFValue(5)}
              fontFamily={Fonts.SemiBold}
              style={{ color: "#384886" }}
            >
              Rain
            </CustomText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? 10 : 5,
    justifyContent: "space-between",
  },
  flexRowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: "#E8EAF5",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
});
export default Header;
