import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
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
      <SafeAreaView style={{ flex: 0, backgroundColor: "#67718a" }} />
      <View style={styles.profileContainer}>
        <Image
          source={require("../assets/Profile_2.png")}
          style={styles.image}
        />
        <Text style={styles.textWhite}>{tester?.username}</Text>
        <Text style={styles.textGrey}>
          {tester?.age +
            " age ◦ " +
            tester?.combinations.length +
            " combinations ◦ " +
            tester?.gender}
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

      <View style={styles.container}>
        <Text style={[styles.text2]}>Trained combinations</Text>
        <ScrollView style={styles.list}>
          {tester?.combinations.map((combination) => (
            <TouchableOpacity
              key={combination.id}
              style={styles.listItem}
              onPress={showCombination(combination.id)}
            >
              <Image
                source={require("../assets/Cube.png")}
                style={styles.cube}
              />
              <View>
                <Text style={styles.text}>{combination.title}</Text>
                <Text style={styles.text3}>
                  {combination.numberOfTrainingSteps +
                    " steps ◦ " +
                    combination.pinLength +
                    " pin length  ◦ " +
                    combination.tests.length +
                    " tests"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: "#67718a",
    height: "38%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: "10%",
  },
  image: {
    height: 80,
    width: 80,
  },
  cube: {
    height: 30,
    width: 30,
    marginRight: "5%",
  },
  container: {
    backgroundColor: "#eef1f7",
  },
  list: {
    height: "60%",
    width: "100%",
    backgroundColor: "#eef1f7",
  },
  listItem: {
    height: 70,
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#eef1f7",
    borderTopWidth: 2,
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
  text3: {
    fontSize: 12,
    color: "rgba(149, 154, 173, 1)",
    alignSelf: "flex-start",
  },
  textGrey: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.6,
  },
  button: {
    width: "50%",
    backgroundColor: "rgba(149, 154, 173, 1)",
    borderRadius: 100,
    alignItems: "center",
    marginTop: 20,
  },
});
