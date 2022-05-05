import React, { useState } from "react";
import {
  ListView,
  SafeAreaView,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { TailwindProvider } from "tailwind-rn";
import PinCircle from "./components/PinCircle";
import AddCombinationScreen from "./screens/AddCombinationScreen";
import CombinationScreen from "./screens/CombinationScreen";
import PinInputScreen from "./screens/PinInputScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterTester from "./screens/RegisterTester";
import TestersScreen from "./screens/TestersScreen";
import TestingResultScreen from "./screens/TestingResultScreen";
import utilities from "./tailwind.json";

export default function App() {
  const tailwind = useTailwind();

  const [passcode, setPasscode] = useState("");

  const enterSymbol = (key: string) => () => {
    setPasscode(passcode + key);
  };

  const INPUT_LENGTH = 6;

  return (
    <TailwindProvider utilities={utilities}>
      <SafeAreaView style={styles.container}>
        <CombinationScreen />
        {/* <TestersScreen /> */}
      </SafeAreaView>
    </TailwindProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f7",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  navigation: {
    height: "10%",
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  navigationButton: {
    width: "50%",
    height: "100%",
    // backgroundColor: "red",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  //NUO CIA
});

const state = {
  testers: [
    {
      username: "aa",
      age: 23,
      dateRegistered: "",
      combinations: [
        {
          title: "combination 1",
          classificator: "",
          features: [],
          pinLength: 8,
          genuineTests: [],
          impostorTests: [],
        },
      ],
    },
  ],
  features: [],
  classificators: [],
};
