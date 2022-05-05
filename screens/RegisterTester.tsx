import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function RegisterTester() {
  const data = [
    {
      label: "data 1",
    },
    {
      label: "data 2",
    },
  ];

  return (
    <>
      <View style={styles.profileContainer}>
        <Text
          style={{
            color: "#ffffff",
            alignContent: "center",
            fontSize: 18,
          }}
        >
          Register new tester
        </Text>
      </View>

      {/* <Text style={[styles.text2]}>Trained combinations</Text> */}
      <ScrollView style={styles.list}>
        <Text style={[styles.greyText, { marginHorizontal: "5%" }]}>
          Please fill in your information
        </Text>
        <TextInput style={styles.input} placeholder="Name*" />
        <TextInput
          style={styles.input}
          placeholder="Age*"
          keyboardType="numeric"
        />
        <TextInput style={styles.input} placeholder="M/F*" />
        <TextInput style={styles.input} placeholder="M/F*" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: "5%",
    borderRadius: 10,
    borderColor: "rgba(149, 154, 173, 0.5)",
    backgroundColor: "#ffffff",
    paddingHorizontal: "2%",
    marginTop: "5%",
  },
  greyText: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "#687089",
    opacity: 0.65,
  },
  profileContainer: {
    backgroundColor: "#67718a",
    height: "8%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  list: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(149, 154, 173, 0.1)",
    paddingVertical: "10%",
  },
  listItem: {
    height: 70,
    width: "100%",
    backgroundColor: "#eef1f7",
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "rgba(149, 154, 173, 0.1)",
    borderTopWidth: 8,
  },
  text: {
    fontSize: 20,
    marginLeft: 30,
  },
  text2: {
    fontSize: 14,
    marginLeft: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    color: "rgba(149, 154, 173, 1)",
  },
  button: {
    width: "50%",
    backgroundColor: "rgba(149, 154, 173, 1)",
    borderRadius: 100,
    alignItems: "center",
  },
});
