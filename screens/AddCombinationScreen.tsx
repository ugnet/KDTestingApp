import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
} from "react-native";
import RadioButton from "../components/RadioButton";

export default function AddCombinationScreen() {
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
          Create new combination
        </Text>
      </View>

      {/* <Text style={[styles.text2]}>Trained combinations</Text> */}
      <ScrollView style={styles.list}>
        <Text
          style={[
            styles.greyText,
            { marginHorizontal: "5%", marginBottom: "2%" },
          ]}
        >
          Select classifier, features and pin length for new keystroke dynamics
          model combination
        </Text>

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Combination name
        </Text>
        <TextInput style={styles.input} placeholder="Combination name*" />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Passcode length
        </Text>
        <TextInput
          style={styles.input}
          placeholder="1-16"
          keyboardType="numeric"
        />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Classifier
        </Text>
        <RadioButton selected label={"Classifier 1"} />
        <RadioButton selected label={"Classifier 1"} />
        <RadioButton selected label={"Classifier 1"} />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Combination of features
        </Text>
        <RadioButton selected label={"Classifier 1"} />
        <RadioButton selected label={"Classifier 1"} />
        <RadioButton selected label={"Classifier 1"} />
        <TouchableOpacity style={styles.button}>
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    height: 40,
    marginHorizontal: "5%",
    borderRadius: 10,
    borderColor: "rgba(149, 154, 173, 0.5)",
    backgroundColor: "#ffffff",
    paddingHorizontal: "2%",
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
    backgroundColor: "#67718a",
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    margin: 20,
  },
});
