import NoticeAnimation from "@/src/components/shared/NoticeAnimation";
import { NoticeHeight } from "@/src/utils/Constants";
import { useEffect, useRef } from "react";
import { View, Animated as RNAnimated } from "react-native";
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
      <View></View>
    </NoticeAnimation>
  );
};

export default Index;
