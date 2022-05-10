import { createSlice } from "@reduxjs/toolkit";

export type ClassifierType = "statistical" | "neural_network";

export interface Feature {
  id: number;
  title: string;
}

export interface Features extends Array<Feature> {}

const initialState: Features = [
  {
    id: 1,
    title: "Up–up time (UU)",
  },
  {
    id: 2,
    title: "Down–down time (DD)",
  },
  {
    id: 3,
    title: "Up–down time (UD)",
  },
  {
    id: 4,
    title: "Down–up time (DU)",
  },
];

const featuresSlice = createSlice({
  name: "featuresSlice",
  initialState,
  reducers: {},
});

export const {} = featuresSlice.actions;
export default featuresSlice.reducer;
