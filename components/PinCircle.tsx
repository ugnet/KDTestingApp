import React from "react";
import { StyleSheet, View } from "react-native";

export default function PinCircle(props: any) {
  return (
    <View style={props.style}>
      <View style={styles.circle}>
        {props.filled && <View style={styles.innerCircle}></View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 36,
    aspectRatio: 1 / 1,
    backgroundColor: "#69708b",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 16,
    aspectRatio: 1 / 1,
    backgroundColor: "#ffffff",
    borderRadius: 100,
  },
});
