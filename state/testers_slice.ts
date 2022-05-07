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
  genuineTests: Array<Test>;
  impostorTests: Array<Test>;
}

export interface Tester {
  id: number;
  username: string;
  age: string;
  gender?: string;
  combinations: Array<Combination>;
}

export interface Testers extends Array<Tester> {}

const initialState: Testers = [
  {
    id: 1,
    username: "tester 1",
    age: "23",
    combinations: [
      {
        id: 1,
        testerId: 1,
        title: "combination 1",
        classificator: 1,
        features: [1, 2],
        pinLength: 8,
        pinCode: "44532347",
        numberOfTrainingSteps: 7,
        genuineTests: [
          {
            testedAs: "genuine",
            authenticateAs: "impostor",
            authentication: "fail",
            date: "2022-01-01",
            id: 1,
          },
        ],
        impostorTests: [
          {
            testedAs: "impostor",
            authenticateAs: "impostor",
            authentication: "fail",
            date: "2022-01-01",
            id: 2,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    username: "tester 2",
    age: "24",
    combinations: [],
  },
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
  },
});

export const { addTester, addCombination, modifyCombinationPin } =
  testersSlice.actions;
export default testersSlice.reducer;
