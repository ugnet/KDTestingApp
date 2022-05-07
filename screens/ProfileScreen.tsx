import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import { useAppSelector } from "../state/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ route, navigation }: Props) {
  const tester = useAppSelector((state) =>
    state.testers.find((tester) => tester.id === route.params.testerId)
  );

  const showCombination = (id: number) => () => {
    if (!tester) return;
    navigation.navigate("Combination", {
      tester: tester,
      combinationId: id,
    });
  };

  const addCombination = () => {
    if (!tester) return;
    navigation.navigate("AddCombination", {
      testerId: tester.id,
    });
  };

  return (
    <>
      <View style={styles.profileContainer}>
        <Text style={styles.textWhite}>{tester?.username}</Text>
        <Text style={styles.textGrey}>
          {tester?.age +
            " age ◦ " +
            tester?.combinations.length +
            " combinations ◦ " +
            tester?.id +
            "#"}
        </Text>
        <TouchableOpacity style={styles.button} onPress={addCombination}>
          <Text
            style={{
              color: "#ffffff",
              alignContent: "center",
              margin: "10%",
              fontSize: 18,
            }}
          >
            Add combination
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.text2]}>Trained combinations</Text>
      <ScrollView style={styles.list}>
        {tester?.combinations.map((combination) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={showCombination(combination.id)}
          >
            <Text style={styles.text}>{combination.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#67718a",
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: "10%",
  },
  list: {
    height: "60%",
    width: "100%",
    backgroundColor: "rgba(149, 154, 173, 0.1)",
    // backgroundColor: "red",
  },
  listItem: {
    height: 70,
    width: "100%",
    backgroundColor: "#eef1f7",
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "rgba(149, 154, 173, 0.4)",
    borderTopWidth: 1,
    paddingHorizontal: "5%",
  },
  textWhite: {
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "600",
  },
  text: {
    fontSize: 20,
  },
  text2: {
    marginHorizontal: "5%",
    fontSize: 20,
    fontWeight: "600",
    paddingVertical: 15,
    alignSelf: "flex-start",
    borderBottomColor: "#67718a",
    borderBottomWidth: 1,
  },
  textGrey: {
    fontSize: 20,
    color: "#ffffff",
    opacity: 0.6,
  },
  button: {
    width: "50%",
    backgroundColor: "rgba(149, 154, 173, 1)",
    borderRadius: 100,
    alignItems: "center",
  },
});
