import { createSlice } from "@reduxjs/toolkit";

export type ClassifierType = "statistical" | "neural_network";

export interface Classfier {
  id: number;
  title: string;
  type: ClassifierType;
  short: string;
  calculation?: () => void;
}

export interface Classfiers extends Array<Classfier> {}

const initialState: Classfiers = [
  {
    id: 1,
    title:
      "Computation efficient statistical classifier (Cheng-Jung Tasia, Ting-Yi Chang and others) ",
    short: "Computation efficient statistical",
    type: "statistical",
  },
];

const classifiersSlice = createSlice({
  name: "classifiers",
  initialState,
  reducers: {},
});

export const {} = classifiersSlice.actions;
export default classifiersSlice.reducer;
