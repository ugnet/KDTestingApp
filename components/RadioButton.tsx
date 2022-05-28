import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

export default function RadioButton(props: any) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View
        style={[
          {
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: props.selected
              ? "#67718a"
              : "rgba(149, 154, 173, 0.5)",
            alignItems: "center",
            justifyContent: "center",
          },
          props.style,
        ]}
      >
        {props.selected ? (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: props.selected
                ? "#67718a"
                : "rgba(149, 154, 173, 0.5)",
            }}
          />
        ) : null}
      </View>
      <Text style={styles.text}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    marginHorizontal: "5%",
    alignItems: "center",
  },
  text: {
    marginLeft: 20,
    marginRight: 10,
  },
});
