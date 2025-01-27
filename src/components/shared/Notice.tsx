import { Fonts, NoticeHeight } from "@/src/utils/Constants";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CustomText from "./CustomText";
import { Defs, G, Path, Svg, Use } from "react-native-svg";
import { wavyData } from "@/src/utils/dummyData";
const Notice = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={{ padding: 10 }}>
            <CustomText
              style={styles.header}
              variant="h8"
              fontFamily={Fonts.SemiBold}
            >
              It's raining near this location
            </CustomText>
            <CustomText variant="h9" style={styles.textCenter}>
              Our delivery partners may take longer to reach you
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
      <Svg
        width={"100%"}
        height={"35"}
        fill={"#CCD5E4"}
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}
      >
        <Defs>
          <Path id="wavepath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavepath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CCD5E4",
  },
  noticeContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CCD5E4",
  },
  header: {
    color: "#2D3875",
    marginBottom: 8,
    textAlign: "center",
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  wave:{
    width:'100%',
    transform:[{rotateX:'180deg'}]
  }
});
