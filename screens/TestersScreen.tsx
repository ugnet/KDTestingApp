import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import Icon from "../components/Icon";

import { useAppDispatch, useAppSelector } from "../state/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Testers">;

export default function TestersScreen({ navigation }: Props) {
  const testers = useAppSelector((state) => state.testers);

  const navigateToProfile = (id: number) => () => {
    navigation.navigate("Profile", {
      testerId: id,
    });
  };

  const registerNewTester = () => {
    navigation.navigate("Register");
  };

  return (
    <>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "#67718a" }} /> */}
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Text
            style={{
              color: "#ffffff",
              alignContent: "center",
              fontSize: 18,
            }}
          >
            Registered testers
          </Text>
        </View>
        <ScrollView style={styles.list}>
          {testers.map((tester) => (
            <TouchableOpacity
              key={tester.username}
              style={styles.listItem}
              onPress={navigateToProfile(tester.id)}
            >
              <Text style={styles.text}>{tester.username}</Text>
              <Text style={styles.text2}>
                {tester.age +
                  " age ◦ " +
                  tester.combinations.length +
                  " combinations"}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={registerNewTester}>
            <Text
              style={{
                color: "#ffffff",
                alignContent: "center",
                margin: "10%",
                fontSize: 14,
              }}
            >
              Register new tester
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(149, 154, 173, 0.1)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  profileContainer: {
    backgroundColor: "#67718a",
    height: "8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  list: {
    height: "60%",
    width: "100%",
    backgroundColor: "rgba(149, 154, 173, 0.1)",
    paddingVertical: "10%",
  },
  listItem: {
    height: 70,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: "20%",
  },
  text: {
    fontSize: 20,
    alignSelf: "flex-start",
  },
  text2: {
    fontSize: 14,
    color: "rgba(149, 154, 173, 1)",
    alignSelf: "flex-start",
  },
  button: {
    width: "50%",
    backgroundColor: "rgba(149, 154, 173, 1)",
    borderRadius: 100,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: "10%",
  },
});
