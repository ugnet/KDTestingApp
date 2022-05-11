import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CombinationScreen from "../screens/CombinationScreen";

export interface Feature {
  name: string;
}

export type TesterType = "genuine" | "impostor";

export type AuthenticationStatus = "success" | "fail";

export interface Test {
  testedAs: TesterType;
  authenticateAs: TesterType;
  authentication: AuthenticationStatus;
  date: string;
  id: number;
  inputData?: InputData;
}

export interface Combination {
  id: number;
  testerId: number;
  title: string;
  classificator: number;
  features: number[];
  pinLength: number;
  pinCode: string;
  numberOfTrainingSteps: number;
  trainingData: Array<InputData>; //TODO
  tests: Array<Test>;
  // impostorTests: Array<Test>;
  FAR?: number;
  FRR?: number;
  EER?: number;
}

export interface Tester {
  id: number;
  username: string;
  age: string;
  gender: string;
  combinations: Array<Combination>;
}

export interface Testers extends Array<Tester> {}

// INPUT
export type PressEventType = "pressIn" | "pressOut" | "press";

export type InputPurpose = "training" | "testing";

export interface KeyPressData {
  id: number;
  key: string;
  pressEventType: PressEventType;
  timeStamp: number;
  pageX: number;
  pageY: number;
  locationX: number;
  locationY: number;
  gyroscode: { x: number; y: number; z: number };
}
export interface InputData {
  input: string; //passcode
  purpose: InputPurpose;
  data: Array<KeyPressData>;
}

const initialState: Testers = [
  // {
  //   id: 1,
  //   username: "tester 1",
  //   age: "23",
  //   gender: "M",
  //   combinations: [
  //     {
  //       id: 1,
  //       testerId: 1,
  //       title: "combination 1",
  //       classificator: 1,
  //       features: [1, 2],
  //       pinLength: 8,
  //       pinCode: "44532347",
  //       numberOfTrainingSteps: 7,
  //       trainingData: [],
  //       tests: [
  //         {
  //           testedAs: "genuine",
  //           authenticateAs: "impostor",
  //           authentication: "fail",
  //           date: "2022-01-01",
  //           id: 1,
  //         },
  //         {
  //           testedAs: "impostor",
  //           authenticateAs: "impostor",
  //           authentication: "success",
  //           date: "2022-01-01",
  //           id: 2,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   username: "tester 2",
  //   age: "24",
  //   gender: "F",
  //   combinations: [],
  // },
];

const testersSlice = createSlice({
  name: "testers",
  initialState,
  reducers: {
    addTester(state, action: PayloadAction<Tester>) {
      state.push(action.payload);
    },
    addCombination(state, action: PayloadAction<Combination>) {
      state
        .find((tester) => tester.id === action.payload.testerId)
        ?.combinations.push(action.payload);
    },
    modifyCombinationPin(state, action: PayloadAction<Combination>) {
      const tester = state.find(
        (tester) => tester.id == action.payload.testerId
      );
      if (tester) {
        const combination = tester.combinations.find(
          (c) => c.id == action.payload.id
        );
        if (combination) {
          combination.pinCode = action.payload.pinCode;
        }
      }
    },
    addTrainingStepData(
      state,
      action: PayloadAction<{
        testerId: number;
        combinationId: number;
        data: InputData;
      }>
    ) {
      const tester = state.find(
        (tester) => tester.id == action.payload.testerId
      );
      if (tester) {
        const combination = tester.combinations.find(
          (c) => c.id == action.payload.combinationId
        );
        if (combination) {
          combination.trainingData = [
            ...combination.trainingData,
            action.payload.data,
          ];
        }
      }
    },
    addTest(
      state,
      action: PayloadAction<{
        testerId: number;
        combinationId: number;
        test: Test;
      }>
    ) {
      const tester = state.find(
        (tester) => tester.id == action.payload.testerId
      );
      if (tester) {
        const combination = tester.combinations.find(
          (c) => c.id == action.payload.combinationId
        );
        if (combination) {
          combination.tests = [...combination.tests, action.payload.test];
        }
      }
    },
  },
});

export const {
  addTester,
  addCombination,
  modifyCombinationPin,
  addTrainingStepData,
  addTest,
} = testersSlice.actions;

export default testersSlice.reducer;
