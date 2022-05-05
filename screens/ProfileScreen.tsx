import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  return (
    <>
      <View style={styles.profileContainer}>
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
      </View>
      <Text style={[styles.text2]}>Trained combinations</Text>
      <ScrollView style={styles.list}>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.text}>Combination 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.text}>Combination 1</Text>
        </TouchableOpacity>
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
  },
  text: {
    fontSize: 20,
    marginLeft: 30,
  },
  text2: {
    fontSize: 20,
    marginLeft: 30,
    fontWeight: "600",
    paddingVertical: 15,
    alignSelf: "flex-start",
    borderBottomColor: "#67718a",
    borderBottomWidth: 1,
  },
  button: {
    width: "50%",
    backgroundColor: "rgba(149, 154, 173, 1)",
    borderRadius: 100,
    alignItems: "center",
  },
});
