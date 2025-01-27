import { NoticeHeight } from "@/src/utils/Constants";
import { FC } from "react";
import { StyleSheet, View, Animated as RNAnimated } from "react-native";
import Notice from "./Notice";
const NOTICE_HEIGHT = NoticeHeight + 12;
const NoticeAnimation: FC<{
  noticePosition: any;
  children: React.ReactNode;
}> = ({ noticePosition, children }) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          { transform: [{ translateY: noticePosition }] },
        ]}
      >
        <Notice/>
      </RNAnimated.View>
      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            // paddingTop: noticePosition.interpolate({
            //   inputRange: [NOTICE_HEIGHT, 0],
            //   outRange: [0, NOTICE_HEIGHT + 20],
            // }),
          },
        ]}
      >
        {children}
      </RNAnimated.View>
    </View>
  );
};
export default NoticeAnimation;
const styles = StyleSheet.create({
  noticeContainer: {
    width: "100%",
    zIndex: 999,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
