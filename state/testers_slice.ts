import { createSlice } from "@reduxjs/toolkit";

interface Feature {
  name: string;
}

type TesterType = "genuine" | "impostor";

type AuthenticationStatus = "success" | "fail";

interface Test {
  testedAs: TesterType;
  authenticateAs: TesterType;
  authentication: AuthenticationStatus;
  date: string;
  id: string;
}

interface Combination {
  title: string;
  classificator: string;
  features: Array<Feature>;
  pinLength: number;
  pinCode: string;
  numberOfTrainingSteps: number;
  genuineTests: Array<Test>;
  impostorTests: Array<Test>;
}

interface Tester {
  username: string;
  age: number;
  dateRegistered: string;
  combinations: Array<Combination>;
}

interface Testers extends Array<Tester> {}

const initialState: Testers = [
  {
    username: "tester 1",
    age: 23,
    dateRegistered: "2022-08-12",
    combinations: [],
  },
  {
    username: "tester 2",
    age: 24,
    dateRegistered: "2022-08-12",
    combinations: [],
  },
];

const testersSlice = createSlice({
  name: "testers",
  initialState,
  reducers: {
    addTester: (state) => {},
  },
});

export const { addTester } = testersSlice.actions;
export default testersSlice.reducer;
