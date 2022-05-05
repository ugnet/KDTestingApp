import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

export default function TestingResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test complete</Text>
      <Text style={styles.greyText}>Tested as impostor</Text>
      <Text style={styles.greyText}>Authenticated as impostor</Text>
      <Text style={styles.greenText}>Authentication successfull</Text>
      <TouchableOpacity>
        <Text
          style={{
            color: "#687089",
            alignContent: "center",
            margin: "10%",
            fontSize: 18,
          }}
        >
          End test
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    alignContent: "center",
    marginTop: "60%",
  },
  text: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  greyText: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "#687089",
    opacity: 0.65,
  },
  greenText: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "green",
    opacity: 0.65,
  },
  redText: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "#fa7470",
    opacity: 0.65,
  },
});
