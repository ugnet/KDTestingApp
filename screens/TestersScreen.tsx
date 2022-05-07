import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "../components/Icon";

import { useAppDispatch, useAppSelector } from "../state/hooks";

export default function TestersScreen() {
  const testers = useAppSelector((state) => state.testers);

  console.log(testers);
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
              onPress={() => {}}
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
        </ScrollView>
      </SafeAreaView>
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
  },
});
