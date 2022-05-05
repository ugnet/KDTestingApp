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

export default function CombinationScreen() {
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
          Tester ◦ Combination name
        </Text>
      </View>

      {/* <Text style={[styles.text2]}>Trained combinations</Text> */}
      <ScrollView style={styles.list}>
        <Text style={[styles.greyText, { marginVertical: 4 }]}>Name: name</Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Passcode length: 4
        </Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Classifier: classifier
        </Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Features: UU, DD
        </Text>

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text style={[styles.greyText, { marginVertical: 4 }]}>EER: ?%</Text>
          <Text style={[styles.greyText, { marginVertical: 4 }]}>FAR: ?%</Text>
          <Text style={[styles.greyText, { marginVertical: 4 }]}>FRR: ?%</Text>
        </View>

        <Text style={[styles.text]}>Tests:</Text>

        <View style={styles.listItem}>
          <Text style={styles.text3}>Tested as: impostor</Text>
          <Text style={styles.text3}>Authenticated as: genuine user</Text>
          <Text style={[styles.text3, { color: "#67718a" }]}>
            Successfull ◦ 2022-07-08 ◦ index
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.text3}>Tested as: impostor</Text>
          <Text style={styles.text3}>Authenticated as: genuine user</Text>
          <Text style={[styles.text3, { color: "#67718a" }]}>
            Successfull ◦ 2022-07-08 ◦ index
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: "#ffffff",
                alignContent: "center",
                margin: "10%",
                fontSize: 14,
              }}
            >
              Test as genuine user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              style={{
                color: "#ffffff",
                alignContent: "center",
                margin: "10%",
                fontSize: 14,
              }}
            >
              Test as impostor
            </Text>
          </TouchableOpacity>
        </View>
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
    opacity: 0.65,
    alignSelf: "flex-start",
    marginHorizontal: "5%",
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
    height: 90,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    borderRadius: 12,
    marginTop: 10,
    marginHorizontal: "5%",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 15,
    marginHorizontal: "5%",
  },
  text3: {
    fontSize: 15,
    marginHorizontal: "5%",
  },
  text2: {
    fontSize: 14,
    marginLeft: 30,
    paddingVertical: 15,
    borderBottomWidth: 1,
    color: "rgba(149, 154, 173, 1)",
  },
  button: {
    width: "45%",
    backgroundColor: "#67718a",
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 20,
    marginBottom: 50,
  },
});
