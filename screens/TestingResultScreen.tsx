import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "TestingResult">;

export default function TestingResultScreen({ route, navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test complete</Text>
      <Text style={styles.greyText}>Tested as {route.params.testedAs}</Text>
      <Text style={styles.greyText}>
        Authenticated as {route.params.authenticatedAs}
      </Text>

      {route.params.testedAs === route.params.authenticatedAs ? (
        <Text style={styles.greenText}>Authentication succesfull</Text>
      ) : (
        <Text style={styles.redText}>Authentication unsuccessfull</Text>
      )}

      <TouchableOpacity onPress={() => navigation.pop(2)}>
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
