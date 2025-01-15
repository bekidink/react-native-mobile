import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomSafeArea from "../components/shared/CustomSafeArea";
import LottieView from "lottie-react-native";
import CustomText from "../components/shared/CustomText";
import { Fonts } from "../utils/Constants";
import CustomInput from "../components/shared/CustomInput";
import { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../components/shared/CustomButton";
import { deliveryLogin } from "../services/authService";
import NavigationUtils from "../utils/navigationUtils";
import useCustomToast from "../utils/useToast";
export default function DeliveryLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useCustomToast();
  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      NavigationUtils.navigate("delivery");
    } catch (error) {
      showToast("Login Failed", "error");
    }
  };
  return (
    <CustomSafeArea>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require("@/src/assets/animations/delivery_man.json")}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Fast Delivery
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color={"#F8890E"}
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />

          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key"
                color={"#F8890E"}
                style={{ marginLeft: 10 }}
                size={RFValue(18)}
              />
            }
            placeholder="password"
            secureTextEntry
            right={false}
          />
          <CustomButton
            disabled={email.length == 0 || password.length < 8}
            loading={loading}
            onPress={handleLogin}
            title="Login"
          />
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    height: "100%",
    width: "100%",
  },
  lottieContainer: {
    height: "100%",
    width: "100%",
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
});
