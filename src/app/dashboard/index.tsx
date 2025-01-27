import NoticeAnimation from "@/src/components/shared/NoticeAnimation";
import Visuals from "@/src/components/shared/Visuals";
import { NoticeHeight } from "@/src/utils/Constants";
import React from "react";
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from "@r0b0t3d/react-native-collapsible";
import { useEffect, useRef } from "react";
import {
  View,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import AnimatedHeader from "@/src/components/shared/AnimatedHeader";
const NOTICE_HEIGHT = -(NoticeHeight + 12);
const Index = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    });
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    });
  };
  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer
            containerStyle={styles.transparentContainer}
          >
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
          </CollapsibleHeaderContainer>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparentContainer: {
    backgroundColor: "transparent",
  },
});
export default withCollapsibleContext(Index);
