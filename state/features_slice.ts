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
    title: "UU",
  },
  {
    id: 2,
    title: "DD",
  },
  {
    id: 2,
    title: "UP",
  },
  {
    id: 3,
    title: "DU",
  },
];

const featuresSlice = createSlice({
  name: "featuresSlice",
  initialState,
  reducers: {},
});

export const {} = featuresSlice.actions;
export default featuresSlice.reducer;
