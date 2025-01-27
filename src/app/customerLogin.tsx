import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import CustomSafeArea from "../components/shared/CustomSafeArea";
import ProductSlider from "../components/ProductSlider";
import Animated from "react-native-reanimated";
import { useRef, useState } from "react";
import NavigationUtils from "../utils/navigationUtils";
import CustomText from "../components/shared/CustomText";
import { Colors, Fonts, lightColors } from "../utils/Constants";
import CustomInput from "../components/shared/CustomInput";
import CustomButton from "../components/shared/CustomButton";
import useKeyboardOffsetHeight from "../utils/useKeyboardOffHeight";
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from "expo-linear-gradient";
import useCustomToast from "../utils/useToast";
import { customerLogin } from "../services/authService";
const bottomColors = [...lightColors].reverse() as [
  string,
  string,
  ...string[]
];
export default function CustomerLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();
  const { showToast } = useCustomToast();
  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      setLoading(false);
      NavigationUtils.replace("dashboard");
    } catch (error) {
      showToast("Failed to Auth", "error");
      setLoading(false);
    }
  };
  const handleGesture = ({ event }: any) => {
    if (event.state === State.END) {
      const { translationX, translationY } = event;
      let direction = "";
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? "right" : "left";
      } else {
        direction = translationY > 0 ? "down" : "up";
      }
      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(" ") === "up up down left right") {
        setGestureSequence([]);
        NavigationUtils.replace("deliveryLogin");
      }
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeArea>
          <ProductSlider />
          <PanGestureHandler >
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode={"on-drag"}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
            >
              <LinearGradient colors={bottomColors} style={styles.gradient}>
                <View style={styles.content}>
                  <Image
                    source={require("@/src/assets/images/logo.png")}
                    style={styles.logo}
                  />
                  <CustomText variant="h2" fontFamily={Fonts.Bold}>
                    Ecom app
                  </CustomText>
                  <CustomText
                    variant="h5"
                    fontFamily={Fonts.SemiBold}
                    style={styles.text}
                  >
                    LogIn or SignIn
                  </CustomText>
                  <CustomInput
                    onChangeText={(text) => {
                      setPhoneNumber(text.slice(0, 10));
                    }}
                    value={phoneNumber}
                    onClear={() => setPhoneNumber("")}
                    left={
                      <CustomText
                        style={styles.phoneText}
                        variant="h6"
                        fontFamily={Fonts.SemiBold}
                      >
                        +251
                      </CustomText>
                    }
                    placeholder="Enter mobile number"
                    inputMode="numeric"
                  />
                  <CustomButton
                    onPress={handleAuth}
                    loading={loading}
                    title="Continue"
                    disabled={phoneNumber.length != 9}
                  />
                </View>
              </LinearGradient>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeArea>
        <View style={styles.footer}>
          <SafeAreaView>
            <CustomText fontSize={RFValue(6)}>
              By Continuing,you agree to our Terms of Service & Privacy Policy
            </CustomText>
          </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },

  subContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  phoneText: {
    marginLeft: 20,
  },
  footer: {
    borderTopWidth: 0.8,
    borderColor: Colors.border,
    paddingBottom: 10,
    zIndex: 22,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fc",
  },
  gradient: {
    paddingTop: 60,
    width: "100%",
  },
});
