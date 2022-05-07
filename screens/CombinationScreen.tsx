import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Picker,
  SafeAreaView,
} from "react-native";
import { RootStackParamList } from "../App";
import RadioButton from "../components/RadioButton";
import { useAppSelector } from "../state/hooks";

type Props = NativeStackScreenProps<RootStackParamList, "Combination">;

export default function CombinationScreen({ route, navigation }: Props) {
  const tester = route.params.tester;

  const combination = route.params.tester.combinations.find(
    (c) => c.id === route.params.combinationId
  );

  const handleTestGenuine = () => {
    navigation.navigate("PinInput", {
      testerId: route.params.tester.id,
      combinationId: route.params.combinationId,
      phase: "testingGenuine",
    });
  };

  const handleTestImpostor = () => {
    navigation.navigate("PinInput", {
      testerId: route.params.tester.id,
      combinationId: route.params.combinationId,
      phase: "testingImpostor",
    });
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
          {tester.username} ◦ {combination?.title}
        </Text>
      </View>

      <ScrollView style={styles.list}>
        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Passcode length: {combination?.pinLength}
        </Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Training sessions: {combination?.numberOfTrainingSteps}
        </Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Classifier: {combination?.classificator}
        </Text>

        <Text style={[styles.greyText, { marginVertical: 4 }]}>
          Features: {combination?.features.toString()}
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
        {combination?.genuineTests.length ||
        combination?.impostorTests.length ? (
          <>
            {combination?.genuineTests.map((test) => (
              <View style={styles.listItem}>
                <Text style={styles.text3}>Tested as: {test.testedAs}</Text>
                <Text style={styles.text3}>
                  Authenticated as: {test.authenticateAs}
                </Text>
                <Text style={[styles.text3, { color: "#67718a" }]}>
                  {test.authentication} ◦ {test.date} ◦ {test.id}
                </Text>
              </View>
            ))}
            {combination?.impostorTests.map((test) => (
              <View style={styles.listItem}>
                <Text style={styles.text3}>Tested as: {test.testedAs}</Text>
                <Text style={styles.text3}>
                  Authenticated as: {test.authenticateAs}
                </Text>
                <Text style={[styles.text3, { color: "#67718a" }]}>
                  {test.authentication} ◦ {test.date} ◦ {test.id}
                </Text>
              </View>
            ))}
          </>
        ) : (
          <Text style={[styles.greyText, { marginVertical: 4 }]}>
            This combination has no tests
          </Text>
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={styles.button} onPress={handleTestGenuine}>
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
          <TouchableOpacity style={styles.button} onPress={handleTestImpostor}>
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
    backgroundColor: "#eef1f7",
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
    backgroundColor: "#eef1f7",
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
