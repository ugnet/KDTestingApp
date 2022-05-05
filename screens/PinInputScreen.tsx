import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PinCircle from "../components/PinCircle";

export default function PinInputScreen() {
  const [passcode, setPasscode] = useState("");

  const enterSymbol = (key: string) => () => {
    setPasscode(passcode + key);
  };

  const INPUT_LENGTH = 6;

  const phaseType: string = "training" || "testingGenuine" || "testingImpostor";

  const [phase, setPhase] = useState(0);

  return (
    <>
      <Text style={styles.text}>Enter passcode</Text>
      <Text style={[styles.greyText, { marginHorizontal: "5%" }]}>
        This is classifier training phase. You will need to enter your passcode
        several times.
      </Text>
      <Text style={styles.errorText}>Passcode incorrect</Text>

      <View style={styles.space4} />
      <View style={styles.gridContainer}>
        <PinCircle filled style={{ marginHorizontal: 4 }} />
        <PinCircle filled style={{ marginHorizontal: 4 }} />
        <PinCircle filled style={{ marginHorizontal: 4 }} />
        <PinCircle filled style={{ marginHorizontal: 4 }} />
        <PinCircle filled style={{ marginHorizontal: 4 }} />
        <PinCircle filled style={{ marginHorizontal: 4 }} />
      </View>
      <View style={styles.space4} />
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("1")}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gridContainer}>
        <TouchableOpacity style={styles.pinButton}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pinButton: {
    backgroundColor: "#ffffff",
    width: "25%",
    aspectRatio: 1 / 1,
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
    margin: "2%",
  },
  buttonText: {
    fontSize: 24,
    alignSelf: "center",
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
  gridContainer: {
    flexDirection: "row",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: "#fa7470",
    opacity: 0.65,
    marginVertical: 4,
  },

  space4: {
    height: "4%",
  },
});
