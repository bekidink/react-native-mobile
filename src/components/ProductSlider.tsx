import React, { FC, useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { imageData } from "../utils/dummyData";
import AutoScroll from "@homielab/react-native-auto-scroll";
const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);
  return (
    <View pointerEvents="none">
      <AutoScroll duration={100} endPaddingWidth={0} style={styles.autoScroll}>
        <View style={styles.gridController}>
          {rows?.map((row, index) => {
            return <MemoizedRow row={row} rowIndex={index} key={index} />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row: FC<{ row: typeof imageData; rowIndex: number }> = ({
  row,
  rowIndex,
}) => {
  return (
    <View style={styles.row}>
      {row.map((image, index) => {
        const horizontalShift = rowIndex % 2 === 0 ? -18 : 18;
        return (
          <View
            key={index}
            style={[
              styles.itemContainer,
              { transform: [{ translateX: horizontalShift }] },
            ]}
          >
            <Image source={image} style={styles.image} />
          </View>
        );
      })}
    </View>
  );
};
const MemoizedRow = React.memo(Row);
export default ProductSlider;
const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginBottom: 12,
    width: "100%",
    height: "100%",
    backgroundColor: "#e9f7f8",
    justifyContent: "center",
    borderRadius: 25,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  autoScroll: {
    position: "absolute",
    zIndex: -2,
  },
  gridController: {
    justifyContent: "center",
    overflow: "visible",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
});
