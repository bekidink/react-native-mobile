import { darkWeatherColors, screenHeight, screenWidth } from "@/src/utils/Constants";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";

const Visuals: FC = () => {
  return (
    <Animated.View style={[styles.container]}>
      <LinearGradient
        colors={darkWeatherColors}
        style={styles.gradient}
      >
        <Image source={require('@/src/assets/images/cloud.png')} style={styles.cloud}/>
  <LottieView autoPlay={true} enableMergePathsAndroidForKitKatAndAbove={true} loop={true} style={styles.lottie} source={require('@/src/assets/animations/raining.json')}/>
      </LinearGradient>
    </Animated.View>
  );
};

export default Visuals;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  lottie: {
    width: "100%",
    height: 150,
    position: "absolute",
    transform: [{ scaleX: -1 }],
  },
  gradient: {
    width: "100%",
    height: screenHeight * 0.4,
    position: "absolute",
  },
  cloud:{
    width:screenWidth,
    resizeMode:'stretch',
    height:100
  }
});
