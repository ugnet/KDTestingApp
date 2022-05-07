import { createSlice } from "@reduxjs/toolkit";

export type ClassifierType = "statistical" | "neural_network";

export interface Classfier {
  id: number;
  title: string;
  type: ClassifierType;
  calculation?: () => void;
}

export interface Classfiers extends Array<Classfier> {}

const initialState: Classfiers = [
  {
    id: 1,
    title: "Median",
    type: "statistical",
  },
  {
    id: 2,
    title: "Median 2",
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
