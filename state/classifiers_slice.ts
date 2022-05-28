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
    short: "Computation efficient statistical (1)",
    type: "statistical",
  },
  {
    id: 2,
    title:
      "Hits factor, deviation ratio and feature fusion (Sudhir Dhage, Pranav Kundra and others) ",
    short: "Hits factor, deviation ratio and feature fusion (2)",
    type: "statistical",
  },
  {
    id: 3,
    title: "The Med-Min-Dif classifier. (N. M. Al-Obaidi and M. M. Al-Jarrah) ",
    short: "The Med-Min-Dif classifier.  (3)",
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
