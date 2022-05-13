import React from "react";
import { StyleSheet } from "react-native";
import AddCombinationScreen from "./screens/AddCombinationScreen";
import CombinationScreen from "./screens/CombinationScreen";
import PinInputScreen, { PhaseType } from "./screens/PinInputScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterTester from "./screens/RegisterTester";
import TestersScreen from "./screens/TestersScreen";
import TestingResultScreen from "./screens/TestingResultScreen";

import { Provider } from "react-redux";
import { store } from "./state/store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AuthenticationStatus,
  Tester,
  TesterType,
} from "./state/testers_slice";

export type RootStackParamList = {
  Register: undefined;
  Testers: undefined;
  Profile: { testerId: number };
  AddCombination: { testerId: number };
  Combination: { tester: Tester; combinationId: number };
  PinInput: { testerId: number; combinationId: number; phase: PhaseType };
  TestingResult: {
    authenticatedAs: TesterType;
    testedAs: TesterType;
    status: AuthenticationStatus;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Testers"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Testers" component={TestersScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Combination" component={CombinationScreen} />
      <Stack.Screen name="Register" component={RegisterTester} />
      <Stack.Screen name="AddCombination" component={AddCombinationScreen} />
      <Stack.Screen name="PinInput" component={PinInputScreen} />
      <Stack.Screen name="TestingResult" component={TestingResultScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
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
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
