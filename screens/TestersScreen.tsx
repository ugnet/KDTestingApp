import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TestersScreen() {
  return (
    <>
      <View style={styles.profileContainer}>
        <Text
          style={{
            color: "#ffffff",
            alignContent: "center",
            // margin: "10%",
            fontSize: 18,
          }}
        >
          Registered testers
        </Text>
      </View>
      {/* <Text style={[styles.text2]}>Trained combinations</Text> */}
      <ScrollView style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.text}>Tester 1</Text>
          <Text style={styles.text2}>3 combination</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.text}>Tester 2</Text>
          <Text style={styles.text2}>15 combination</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
