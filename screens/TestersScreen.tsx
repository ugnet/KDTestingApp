import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { RootStackParamList } from "../App";

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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#67718a" }} />
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
            key={tester.id}
            style={styles.listItem}
            onPress={navigateToProfile(tester.id)}
          >
            <Image
              source={require("../assets/Profile_1.png")}
              style={styles.image}
            />
            <View>
              <Text style={styles.text}>{tester.username}</Text>
              <Text style={styles.text2}>
                {tester.age +
                  " age ◦ " +
                  tester.combinations.length +
                  " combinations"}
              </Text>
            </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f7",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    height: 45,
    width: 45,
    marginRight: "5%",
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
    backgroundColor: "#eef1f7",
    paddingVertical: "10%",
  },
  listItem: {
    height: 70,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: "8%",
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
