import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../App";
import RadioButton from "../components/RadioButton";
import { useAppSelector, useAppDispatch } from "../state/hooks";
import { addCombination, Combination } from "../state/testers_slice";

type Props = NativeStackScreenProps<RootStackParamList, "AddCombination">;

export default function AddCombinationScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();

  const [title, settitle] = useState("");
  const [length, setLength] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = React.useState(false);

  const classifiers = useAppSelector((state) => state.classifiers);
  const features = useAppSelector((state) => state.features);
  const tester = useAppSelector((state) =>
    state.testers.find((t) => t.id === route.params.testerId)
  );

  const [classifiersSelection, setClassifiersSelection] = useState(0);
  const [featuresSelection, setFeaturesSelection] = useState<Array<number>>([]);

  const handleFeatureSelect = (id: number) => () => {
    if (featuresSelection.includes(id)) {
      setFeaturesSelection([...featuresSelection.filter((i) => i !== id)]);
      return;
    } else {
      setFeaturesSelection([...featuresSelection, id]);
    }
  };

  const handleAddCombination = () => {
    if (!tester) return;

    if (
      !title ||
      !length ||
      !steps ||
      !classifiersSelection ||
      !featuresSelection.length ||
      parseInt(length) > 16 ||
      parseInt(length) < 4 ||
      parseInt(steps) > 20 ||
      parseInt(steps) < 6
    )
      return setError(true);

    const combination: Combination = {
      id: tester?.combinations.length + 1,
      testerId: route.params.testerId,
      title: title,
      classificator: classifiersSelection,
      features: featuresSelection,
      pinLength: parseInt(length),
      pinCode: "",
      numberOfTrainingSteps: parseInt(steps),
      tests: [],
      trainingData: [],
    };

    dispatch(addCombination(combination));

    navigation.navigate("PinInput", {
      testerId: route.params.testerId,
      combinationId: tester?.combinations.length + 1,
      phase: "creatingPin",
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
        {error ? (
          <Text style={[styles.errorText, { marginHorizontal: "5%" }]}>
            Incorrect format
          </Text>
        ) : null}

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Combination title
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Combination name"
          value={title}
          onChangeText={settitle}
        />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Passcode length
        </Text>
        <TextInput
          style={styles.input}
          placeholder="4-16"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Number of training steps
        </Text>
        <TextInput
          style={styles.input}
          placeholder="6-20"
          keyboardType="numeric"
          value={steps}
          onChangeText={setSteps}
        />

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Classifier
        </Text>
        {classifiers.map((c) => (
          <RadioButton
            key={c.id}
            label={c.title}
            selected={classifiersSelection === c.id}
            onPress={() => setClassifiersSelection(c.id)}
          />
        ))}

        <Text style={[styles.greyText, { marginVertical: 10 }]}>
          Combination of features
        </Text>
        {features.map((f) => (
          <RadioButton
            key={f.id}
            label={f.title}
            selected={featuresSelection.includes(f.id)}
            onPress={handleFeatureSelect(f.id)}
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={handleAddCombination}>
          <Text
            style={{
              color: "#ffffff",
              alignContent: "center",
              margin: "10%",
              fontSize: 18,
            }}
          >
            Train combination
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
    marginBottom: 100,
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
