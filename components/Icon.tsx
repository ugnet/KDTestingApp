import React from "react";
import { StyleSheet, View } from "react-native";

export default function Icon(props: any) {
  return (
    // <View style={props.container}>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="600"
      height="600"
      fill="white"
    >
      <title>Abstract user icon</title>
      {/* 
        <defs>
          <clipPath id="circular-border">
            <circle cx="300" cy="300" r="250" />
          </clipPath>
        </defs> */}

      {/* <circle cx="300" cy="300" r="280" fill="black" />
        <circle cx="300" cy="230" r="100" />
        <circle cx="300" cy="550" r="190" clip-path="url(#circular-border)" /> */}
    </svg>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
