import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { addTester, Tester } from "../state/testers_slice";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterTester({ navigation }: Props) {
  const [username, onChangeUsername] = React.useState("");
  const [age, onChangeAge] = React.useState("");
  const [gender, onChangeGender] = React.useState("");
  const [hand, onChangeHand] = React.useState("");

  const handRegex = /^[RrlL]*$/;
  const genderRegex = /^[OoMmFf]*$/;

  const [error, setError] = React.useState(false);

  const testers = useAppSelector((state) => state.testers);

  const dispatch = useAppDispatch();

  const handleRegister = () => {
    if (
      !username ||
      !age ||
      !gender ||
      !hand ||
      !handRegex.test(hand) ||
      !genderRegex.test(gender)
    )
      return setError(true);

    const tester: Tester = {
      id: testers.length + 1,
      username: username,
      age: age,
      gender: gender,
      combinations: [],
    };

    dispatch(addTester(tester));

    navigation.navigate("Testers");
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#67718a" }} />
      <View style={styles.container}>
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

          {error ? (
            <Text style={[styles.errorText, { marginHorizontal: "5%" }]}>
              Incorrect format
            </Text>
          ) : null}

          <Text style={styles.text2}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            onChangeText={onChangeUsername}
          />

          <Text style={styles.text2}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="age"
            keyboardType="numeric"
            value={age}
            onChangeText={onChangeAge}
          />

          <Text style={styles.text2}>Gender (male/female/other)</Text>
          <TextInput
            style={styles.input}
            placeholder="M/F/O"
            value={gender}
            onChangeText={onChangeGender}
          />

          <Text style={styles.text2}>Hand prefference (right/left)</Text>
          <TextInput
            style={styles.input}
            placeholder="R/L"
            value={hand}
            onChangeText={onChangeHand}
          />
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text
              style={{
                color: "#ffffff",
                alignContent: "center",
                margin: "10%",
                fontSize: 14,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f7",
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
    marginTop: "2%",
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
    color: "rgba(149, 154, 173, 1)",
    alignSelf: "flex-start",
    marginHorizontal: "5%",
    marginTop: "4%",
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
  errorText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: "#fa7470",
    opacity: 0.65,
    marginVertical: 4,
  },
});
