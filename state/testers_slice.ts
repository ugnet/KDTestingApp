import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  title: string;
  classificator: string;
  features: string[];
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
        title: "combination 1",
        classificator: "classficator",
        features: ["DD", "PP"],
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
  },
});

export const { addTester } = testersSlice.actions;
export default testersSlice.reducer;
