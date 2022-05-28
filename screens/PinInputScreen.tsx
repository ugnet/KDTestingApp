import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../App";
import {
  authenticate1,
  authenticate3,
  authenticate4,
} from "../calculations/classifiers";
import PinCircle from "../components/PinCircle";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  addTest,
  addTrainingStepData,
  InputData,
  KeyPressData,
  modifyCombinationPin,
  PressEventType,
} from "../state/testers_slice";

export type PhaseType =
  | "training"
  | "testingGenuine"
  | "testingImpostor"
  | "creatingPin";

type Props = NativeStackScreenProps<RootStackParamList, "PinInput">;

export default function PinInputScreen({ route, navigation }: Props) {
  const THRESHOLD = 2.7;
  const dispatch = useAppDispatch();
  const [phase, setPhase] = useState(route.params.phase);
  // INPUT DATA:
  const inputDataInit: InputData = {
    input: "",
    purpose: phase === "training" ? "training" : "testing",
    data: [],
  };

  useEffect(() => {
    setPhase(route.params.phase);
  }, [route.params.phase]);

  const tester = useAppSelector((state) =>
    state.testers.find((t) => t.id === route.params.testerId)
  );
  const combination = tester?.combinations.find(
    (c) => c.id === route.params.combinationId
  );

  const pinCircleSize =
    combination?.pinLength && combination?.pinLength > 12
      ? "small"
      : combination?.pinLength && combination?.pinLength > 8
      ? "medium"
      : "large";

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
    console.log("input");
    if (currentIndex + 1 === combination?.pinLength) {
      if (phase === "creatingPin") {
        console.log("bb");
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
    setInputData(inputDataInit);
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

  const [inputData, setInputData] = useState(inputDataInit);

  const handlePressIn = (e: GestureResponderEvent, key: string) => {
    if (phase === "creatingPin") return;
    setInputData({
      ...inputData,
      input: inputData.input.concat(key),
      data: [...inputData.data, getPressData(e, key, "pressIn")],
    });
  };

  const handlePressOut = (e: GestureResponderEvent, key: string) => {
    if (phase === "creatingPin") return;
    setInputData({
      ...inputData,
      data: [...inputData.data, getPressData(e, key, "pressOut")],
    });
  };

  useEffect(() => {
    if (currentIndex === combination?.pinLength) {
      if (phase === "training") {
        //TRAINING
        if (!validatePasscode(passcode.join(""))) {
          setError(true);
        } else {
          // Save training step input data
          console.log("training !!!");
          dispatch(
            addTrainingStepData({
              testerId: route.params.testerId,
              combinationId: route.params.combinationId,
              data: inputData,
            })
          );
          console.log("inputData<<<<<", inputData);
          if (trainingStep === combination.numberOfTrainingSteps) {
            navigation.pop(2);
          }
          setTrainingStep(trainingStep + 1);
        }

        clearInput();
        return;
      } else if (phase === "testingGenuine" || phase === "testingImpostor") {
        if (!validatePasscode(passcode.join(""))) {
          setError(true);
        } else {
          //TODO: ADD TEST
          // console.log("!!!!!!", inputData);
          let isLegitimate: boolean;
          switch (combination.classificator) {
            case 1:
              isLegitimate = authenticate1(combination, inputData, THRESHOLD);
              break;
            case 3:
              isLegitimate = authenticate3(combination, inputData);
              break;
            case 4:
              isLegitimate = authenticate4(combination, inputData, 0.8);
              break;
            default:
              isLegitimate = false;
          }
          dispatch(
            addTest({
              testerId: route.params.testerId,
              combinationId: route.params.combinationId,
              test: {
                testedAs: phase === "testingGenuine" ? "genuine" : "impostor",
                authenticateAs: isLegitimate ? "genuine" : "impostor",
                authentication:
                  (isLegitimate && phase === "testingGenuine") ||
                  (!isLegitimate && phase === "testingImpostor")
                    ? "success"
                    : "fail",
                date: new Date().toISOString().slice(0, 10),
                id: combination.tests.length + 1,
                inputData: inputData,
              },
            })
          );
          navigation.navigate("TestingResult", {
            authenticatedAs: isLegitimate ? "genuine" : "impostor", //TODO
            testedAs: phase === "testingGenuine" ? "genuine" : "impostor",
            status:
              (isLegitimate && phase === "testingGenuine") ||
              (!isLegitimate && phase === "testingImpostor")
                ? "success"
                : "fail",
          });
        }

        clearInput();
        return;
      }
    }
  }, [inputData, passcode]);

  const getPressData = (
    e: GestureResponderEvent,
    key: string,
    pressEventType: PressEventType
  ): KeyPressData => {
    // console.log("PRESSURE: ", e.nativeEvent.force);
    return {
      id: inputData.data?.length || 0,
      key: key,
      pressEventType: pressEventType,
      timeStamp: e.timeStamp,
      pageX: e.nativeEvent.pageX,
      pageY: e.nativeEvent.pageY,
      pressure: e.nativeEvent.force || 0,
      locationX: e.nativeEvent.locationX,
      locationY: e.nativeEvent.locationY,
      gyroscode: { x: 0, y: 0, z: 0 }, //TODO
    };
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
          {passcode.map((value, index) => (
            <PinCircle
              key={index}
              filled={value !== ""}
              style={{
                marginHorizontal:
                  pinCircleSize === "large"
                    ? 4
                    : pinCircleSize === "medium"
                    ? 2
                    : 1,
              }}
              size={pinCircleSize}
            />
          ))}
        </View>
        <View style={styles.space4} />

        <View style={styles.gridContainer}>
          {["1", "2", "3"].map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.pinButton}
              onPress={enterSymbol(key)}
              onPressIn={(event: GestureResponderEvent) =>
                handlePressIn(event, key)
              }
              onPressOut={(event: GestureResponderEvent) =>
                handlePressOut(event, key)
              }
            >
              <Text style={styles.buttonText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.gridContainer}>
          {["4", "5", "6"].map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.pinButton}
              onPress={enterSymbol(key)}
              onPressIn={(event: GestureResponderEvent) =>
                handlePressIn(event, key)
              }
              onPressOut={(event: GestureResponderEvent) =>
                handlePressOut(event, key)
              }
            >
              <Text style={styles.buttonText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.gridContainer}>
          {["7", "8", "9"].map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.pinButton}
              onPress={enterSymbol(key)}
              onPressIn={(event: GestureResponderEvent) =>
                handlePressIn(event, key)
              }
              onPressOut={(event: GestureResponderEvent) =>
                handlePressOut(event, key)
              }
            >
              <Text style={styles.buttonText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.gridContainer}>
          <TouchableOpacity
            style={styles.pinButton}
            onPress={enterSymbol("0")}
            onPressIn={(event: GestureResponderEvent) =>
              handlePressIn(event, "0")
            }
            onPressOut={(event: GestureResponderEvent) =>
              handlePressOut(event, "0")
            }
          >
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
