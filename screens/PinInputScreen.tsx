import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import PinCircle from "../components/PinCircle";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { modifyCombinationPin } from "../state/testers_slice";

export type PhaseType =
  | "training"
  | "testingGenuine"
  | "testingImpostor"
  | "creatingPin";

type Props = NativeStackScreenProps<RootStackParamList, "PinInput">;

export default function PinInputScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();

  const phase = route.params.phase;

  const tester = useAppSelector((state) =>
    state.testers.find((t) => t.id === route.params.testerId)
  );
  const combination = tester?.combinations.find(
    (c) => c.id === route.params.combinationId
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = React.useState(false);
  const [trainingStep, setTrainingStep] = React.useState(1);
  const [passcode, setPasscode] = useState<Array<string>>(
    Array(combination?.pinLength).join(".").split(".")
  );

  useEffect(() => {
    setCurrentIndex(0);
    setPasscode(Array(combination?.pinLength).join(".").split("."));
  }, [phase]);

  const enterSymbol = (key: string) => () => {
    const pass = [...passcode];
    pass[currentIndex] = key;
    setPasscode(pass);
    setError(false);
    if (currentIndex + 1 === combination?.pinLength) {
      if (phase === "creatingPin") {
        // save pin
        dispatch(
          modifyCombinationPin({
            ...combination,
            pinCode: passcode.join("") + key,
          })
        );
        // navigate to training
        navigation.navigate("PinInput", {
          testerId: route.params.testerId,
          combinationId: route.params.combinationId,
          phase: "training",
        });
      } else if (phase === "training") {
        //TRAINING
        if (!validatePasscode(passcode.join("") + key)) {
          setError(true);
        } else {
          if (trainingStep === combination.numberOfTrainingSteps) {
            navigation.pop(2);
          }
          setTrainingStep(trainingStep + 1);
        }

        clearInput();
        return;
      } else if (phase === "testingGenuine" || phase === "testingImpostor") {
        if (!validatePasscode(passcode.join("") + key)) {
          setError(true);
        } else {
          //TODO: ADD TEST
          navigation.navigate("TestingResult", {
            authenticatedAs: "genuine", //TODO
            testedAs: phase === "testingGenuine" ? "genuine" : "impostor",
            status: "success",
          });
        }

        clearInput();
        return;
      }
    }
    setCurrentIndex(currentIndex + 1);
  };

  const validatePasscode = (passcode: string) => {
    return combination?.pinCode === passcode;
  };

  const clearInput = () => {
    setCurrentIndex(0);
    setPasscode(Array(combination?.pinLength).join(".").split("."));
  };

  const getDescription = () => {
    switch (route.params.phase) {
      case "creatingPin": {
        return "Create new passcode.";
      }
      case "testingGenuine": {
        return "This is classifier testing phase. You are testing as genuine user.";
      }
      case "testingImpostor": {
        return "This is classifier testing phase. You are testing as impostor.";
      }
      case "training": {
        return "This is classifier training phase. You will need to enter your passcode several times.";
      }
      default: {
        break;
      }
    }
  };

  const getTitle = () => {
    switch (route.params.phase) {
      case "creatingPin": {
        return "Create passcode";
      }
      case "testingImpostor":
      case "testingGenuine": {
        return "Enter passcode";
      }
      case "training": {
        return "Enter created passcode";
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>{getTitle()}</Text>
        <Text style={[styles.greyText, { marginHorizontal: "5%" }]}>
          {getDescription()}
        </Text>
        {phase === "training" && (
          <Text>
            {combination?.numberOfTrainingSteps &&
              combination?.numberOfTrainingSteps - trainingStep + 1}{" "}
            inputs left
          </Text>
        )}

        {error && <Text style={styles.errorText}>Passcode incorrect</Text>}

        <View style={styles.space4} />
        <View style={styles.gridContainer}>
          {passcode.map((value) => (
            <PinCircle filled={value !== ""} style={{ marginHorizontal: 4 }} />
          ))}
        </View>
        <View style={styles.space4} />
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("1")}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("2")}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("3")}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("4")}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("5")}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("6")}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("7")}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("8")}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("9")}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity style={styles.pinButton} onPress={enterSymbol("0")}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f7",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  pinButton: {
    backgroundColor: "#ffffff",
    width: "25%",
    aspectRatio: 1 / 1,
    borderRadius: 12,
    alignContent: "center",
    justifyContent: "center",
    margin: "2%",
  },
  buttonText: {
    fontSize: 24,
    alignSelf: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  greyText: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    color: "#687089",
    opacity: 0.65,
  },
  gridContainer: {
    flexDirection: "row",
  },
  errorText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    color: "#fa7470",
    opacity: 0.65,
    marginVertical: 4,
  },

  space4: {
    height: "4%",
  },
});
